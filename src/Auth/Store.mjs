// @ts-check

/**
 * @namespace Alarisa_Back_Auth_Store
 * @description File-backed private persistence for Principal authentication state.
 */

export default class Store {
  /**
   * @param {object} deps
   * @param {Alarisa_Back_Node_Crypto} deps.crypto
   * @param {Alarisa_Back_Node_FsPromises} deps.fs
   * @param {Alarisa_Back_Node_Path} deps.path
   * @param {Alarisa_Back_Config_Runtime} deps.config
   */
  constructor({crypto, fs, path, config}) {
    const root = () => path.join(config.dataRoot, "authentication");
    const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
    const now = () => new Date().toISOString();

    const authError = (code, message) => {
      const error = new Error(message);
      error.code = code;
      return error;
    };

    const readJson = async (file) => JSON.parse(await fs.readFile(file, "utf8"));

    const writeJson = async (file, value, {exclusive = false} = {}) => {
      await fs.mkdir(path.dirname(file), {recursive: true});
      if (exclusive) {
        await fs.writeFile(file, `${JSON.stringify(value)}\n`, {encoding: "utf8", flag: "wx", mode: 0o600});
        return;
      }
      const temporary = `${file}.${crypto.randomBytes(8).toString("hex")}.tmp`;
      await fs.writeFile(temporary, `${JSON.stringify(value)}\n`, {encoding: "utf8", flag: "wx", mode: 0o600});
      await fs.rename(temporary, file);
    };

    const listRecords = async (directory) => {
      try {
        const names = await fs.readdir(directory);
        const records = [];
        for (const name of names) {
          if (!name.endsWith(".json")) continue;
          records.push(await readJson(path.join(directory, name)));
        }
        return records;
      } catch (error) {
        if (error?.code === "ENOENT") return [];
        throw error;
      }
    };

    this.createEnrollment = async function ({token, label, surface, expiresAt}) {
      const tokenHash = hash(token);
      const record = Object.freeze({
        tokenHash,
        label,
        surface,
        createdAt: now(),
        expiresAt,
        usedAt: null,
      });
      await writeJson(path.join(root(), "enrollments", `${tokenHash}.json`), record, {exclusive: true});
      return record;
    };

    this.getEnrollment = async function (token) {
      const tokenHash = hash(token);
      let record;
      try {
        record = await readJson(path.join(root(), "enrollments", `${tokenHash}.json`));
      } catch (error) {
        if (error?.code === "ENOENT") throw authError("INVALID_ENROLLMENT", "Enrollment capability is invalid.");
        throw error;
      }
      if (record.usedAt) throw authError("INVALID_ENROLLMENT", "Enrollment capability has already been used.");
      if (Date.parse(record.expiresAt) <= Date.now()) throw authError("EXPIRED_ENROLLMENT", "Enrollment capability has expired.");
      return record;
    };

    this.consumeEnrollment = async function (token) {
      const record = await this.getEnrollment(token);
      const updated = Object.freeze({...record, usedAt: now()});
      await writeJson(path.join(root(), "enrollments", `${record.tokenHash}.json`), updated);
      return updated;
    };

    this.createChallenge = async function ({type, challenge, surface, enrollmentTokenHash = null, expiresAt}) {
      const id = crypto.randomBytes(24).toString("base64url");
      const record = Object.freeze({id, type, challenge, surface, enrollmentTokenHash, createdAt: now(), expiresAt});
      await writeJson(path.join(root(), "challenges", `${id}.json`), record, {exclusive: true});
      return record;
    };

    this.takeChallenge = async function ({id, type}) {
      const file = path.join(root(), "challenges", `${id}.json`);
      let record;
      try {
        record = await readJson(file);
        await fs.unlink(file);
      } catch (error) {
        if (error?.code === "ENOENT") throw authError("INVALID_CHALLENGE", "Authentication ceremony is invalid or already used.");
        throw error;
      }
      if (record.type !== type) throw authError("INVALID_CHALLENGE", "Authentication ceremony type does not match.");
      if (Date.parse(record.expiresAt) <= Date.now()) throw authError("EXPIRED_CHALLENGE", "Authentication ceremony has expired.");
      return record;
    };

    this.listCredentials = async function ({includeRevoked = false} = {}) {
      const records = await listRecords(path.join(root(), "credentials"));
      return includeRevoked ? records : records.filter((record) => !record.revokedAt);
    };

    this.getCredential = async function (credentialId) {
      try {
        const record = await readJson(path.join(root(), "credentials", `${hash(credentialId)}.json`));
        if (record.revokedAt) throw authError("REVOKED_CREDENTIAL", "Authenticator credential has been revoked.");
        return record;
      } catch (error) {
        if (error?.code === "ENOENT") throw authError("UNKNOWN_CREDENTIAL", "Authenticator credential is not registered.");
        throw error;
      }
    };

    this.saveCredential = async function (record) {
      const file = path.join(root(), "credentials", `${hash(record.id)}.json`);
      try {
        await writeJson(file, record, {exclusive: true});
      } catch (error) {
        if (error?.code === "EEXIST") throw authError("CREDENTIAL_EXISTS", "Authenticator credential is already registered.");
        throw error;
      }
      return record;
    };

    this.updateCredentialUse = async function ({credentialId, counter}) {
      const current = await this.getCredential(credentialId);
      const updated = Object.freeze({...current, counter, lastUsedAt: now()});
      await writeJson(path.join(root(), "credentials", `${hash(credentialId)}.json`), updated);
      return updated;
    };

    this.revokeCredential = async function (credentialId) {
      const current = await this.getCredential(credentialId);
      const updated = Object.freeze({...current, revokedAt: now()});
      await writeJson(path.join(root(), "credentials", `${hash(credentialId)}.json`), updated);
      return updated;
    };

    this.createSession = async function ({token, credentialId, surface, expiresAt, stepUpAt}) {
      const tokenHash = hash(token);
      const createdAt = now();
      const record = Object.freeze({tokenHash, principalId: "principal", credentialId, surface, createdAt, lastSeenAt: createdAt, expiresAt, revokedAt: null, stepUpAt});
      await writeJson(path.join(root(), "sessions", `${tokenHash}.json`), record, {exclusive: true});
      return record;
    };

    this.getSession = async function (token) {
      const tokenHash = hash(token);
      try {
        return await readJson(path.join(root(), "sessions", `${tokenHash}.json`));
      } catch (error) {
        if (error?.code === "ENOENT") throw authError("INVALID_SESSION", "Principal session is invalid.");
        throw error;
      }
    };

    this.updateSession = async function (record) {
      await writeJson(path.join(root(), "sessions", `${record.tokenHash}.json`), record);
      return record;
    };

    this.revokeSession = async function (token) {
      let current;
      try {
        current = await this.getSession(token);
      } catch (error) {
        if (error?.code === "INVALID_SESSION") return false;
        throw error;
      }
      if (!current.revokedAt) await this.updateSession(Object.freeze({...current, revokedAt: now()}));
      return true;
    };

    this.revokeCredentialSessions = async function (credentialId) {
      const records = await listRecords(path.join(root(), "sessions"));
      let count = 0;
      for (const record of records) {
        if (record.credentialId !== credentialId || record.revokedAt) continue;
        await this.updateSession(Object.freeze({...record, revokedAt: now()}));
        count += 1;
      }
      return count;
    };
  }
}

export const __deps__ = Object.freeze({
  crypto: "node:crypto",
  fs: "node:fs/promises",
  path: "node:path",
  config: "Alarisa_Back_Config_Runtime$",
});
