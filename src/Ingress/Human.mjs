// @ts-check

/**
 * @namespace Alarisa_Back_Ingress_Human
 * @description Durably accepts idempotent Principal contributions after transport validation.
 */

const ID_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;

export default class Human {
  /**
   * @param {object} deps
   * @param {Alarisa_Back_Node_FsPromises} deps.fs
   * @param {Alarisa_Back_Node_Path} deps.path
   * @param {Alarisa_Back_Config_Runtime} deps.config
   */
  constructor({fs, path, config}) {
    /**
     * @param {{contributionId: string, text: string, channel: string}} input
     * @returns {Promise<{accepted: true, contributionId: string}>}
     */
    this.accept = async function ({contributionId, text, channel}) {
      if (!ID_PATTERN.test(contributionId)) throw new Error("Invalid contribution identifier.");
      if (typeof text !== "string" || text.length === 0) throw new Error("Contribution text is required.");
      if (typeof channel !== "string" || channel.length === 0) throw new Error("Contribution channel is required.");

      const directory = path.join(config.dataRoot, "principal-contributions");
      const file = path.join(directory, `${contributionId}.json`);
      const record = Object.freeze({
        contributionId,
        text,
        channel,
        acceptedAt: new Date().toISOString(),
      });
      await fs.mkdir(directory, {recursive: true});

      try {
        await fs.writeFile(file, `${JSON.stringify(record)}\n`, {encoding: "utf8", flag: "wx", mode: 0o600});
      } catch (error) {
        if (error?.code !== "EEXIST") throw error;
        const existing = JSON.parse(await fs.readFile(file, "utf8"));
        if (existing.text !== text || existing.channel !== channel) {
          const conflict = new Error("Contribution identifier is already used for different content.");
          conflict.code = "CONTRIBUTION_CONFLICT";
          throw conflict;
        }
      }

      return Object.freeze({accepted: true, contributionId});
    };
  }
}

export const __deps__ = Object.freeze({
  fs: "node:fs/promises",
  path: "node:path",
  config: "Alarisa_Back_Config_Runtime$",
});
