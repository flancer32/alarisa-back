// @ts-check

/**
 * @namespace Alarisa_Back_Config_Runtime
 * @description Immutable server runtime configuration shared by back-area components.
 */
export class Data {
  /** @type {string|undefined} */
  host;
  /** @type {number|undefined} */
  httpPort;
  /** @type {string|undefined} */
  serverType;
  /** @type {string|undefined} */
  dataRoot;
  /** @type {string|undefined} */
  authOrigin;
  /** @type {string|undefined} */
  authRpId;
  /** @type {string|undefined} */
  authRpName;
  /** @type {number|undefined} */
  authChallengeTtlMs;
  /** @type {number|undefined} */
  authEnrollmentTtlMs;
  /** @type {number|undefined} */
  authMobSessionTtlMs;
  /** @type {number|undefined} */
  authDeskSessionTtlMs;
  /** @type {number|undefined} */
  authStepUpTtlMs;
  /** @type {Fl32_Web_Back_Config_Runtime} */
  web;
}

const cfg = new Data();
const facade = {};
let frozen = false;

const proxy = new Proxy(facade, {
  get(_target, prop) {
    const isServiceProp = prop === "then" || typeof prop === "symbol";
    if (!frozen && !isServiceProp) throw new Error("Runtime configuration is not initialized.");
    return Reflect.get(cfg, prop);
  },
  set() {
    throw new Error("Runtime configuration is immutable.");
  },
  defineProperty() {
    throw new Error("Runtime configuration is immutable.");
  },
  deleteProperty() {
    throw new Error("Runtime configuration is immutable.");
  },
  preventExtensions() {
    throw new Error("Runtime configuration cannot be structurally mutated.");
  },
});

/**
 * @namespace Alarisa_Back_Config_Runtime__Factory
 * @description Factory for the immutable back-area runtime configuration.
 */
export class Factory {
  /**
   * @param {object} deps
   * @param {Fl32_Web_Back_Config_Runtime__Factory} deps.webRuntimeFactory
   */
  constructor({webRuntimeFactory}) {
    let factoryFrozen = false;
    cfg.host = undefined;
    cfg.httpPort = undefined;
    cfg.serverType = undefined;
    cfg.dataRoot = undefined;
    cfg.authOrigin = undefined;
    cfg.authRpId = undefined;
    cfg.authRpName = undefined;
    cfg.authChallengeTtlMs = undefined;
    cfg.authEnrollmentTtlMs = undefined;
    cfg.authMobSessionTtlMs = undefined;
    cfg.authDeskSessionTtlMs = undefined;
    cfg.authStepUpTtlMs = undefined;
    frozen = false;

    this.configure = function (params = {}) {
      if (factoryFrozen) throw new Error("Runtime configuration is already frozen.");
      if (params.host !== undefined && cfg.host === undefined) cfg.host = params.host;
      if (params.httpPort !== undefined && cfg.httpPort === undefined) cfg.httpPort = params.httpPort;
      if (params.serverType !== undefined && cfg.serverType === undefined) cfg.serverType = params.serverType;
      if (params.dataRoot !== undefined && cfg.dataRoot === undefined) cfg.dataRoot = params.dataRoot;
      if (params.authOrigin !== undefined && cfg.authOrigin === undefined) cfg.authOrigin = params.authOrigin;
      if (params.authRpId !== undefined && cfg.authRpId === undefined) cfg.authRpId = params.authRpId;
      if (params.authRpName !== undefined && cfg.authRpName === undefined) cfg.authRpName = params.authRpName;
      if (params.authChallengeTtlMs !== undefined && cfg.authChallengeTtlMs === undefined) cfg.authChallengeTtlMs = params.authChallengeTtlMs;
      if (params.authEnrollmentTtlMs !== undefined && cfg.authEnrollmentTtlMs === undefined) cfg.authEnrollmentTtlMs = params.authEnrollmentTtlMs;
      if (params.authMobSessionTtlMs !== undefined && cfg.authMobSessionTtlMs === undefined) cfg.authMobSessionTtlMs = params.authMobSessionTtlMs;
      if (params.authDeskSessionTtlMs !== undefined && cfg.authDeskSessionTtlMs === undefined) cfg.authDeskSessionTtlMs = params.authDeskSessionTtlMs;
      if (params.authStepUpTtlMs !== undefined && cfg.authStepUpTtlMs === undefined) cfg.authStepUpTtlMs = params.authStepUpTtlMs;
      webRuntimeFactory.configure({
        host: params.host,
        port: params.httpPort,
        type: params.serverType,
      });
    };

    this.freeze = function () {
      if (factoryFrozen) return proxy;
      if (cfg.host === undefined) cfg.host = "127.0.0.1";
      if (cfg.httpPort === undefined) cfg.httpPort = 3000;
      if (cfg.serverType === undefined) cfg.serverType = "http";
      if (cfg.dataRoot === undefined) cfg.dataRoot = "var";
      if (cfg.authOrigin === undefined) cfg.authOrigin = "http://localhost:3000";
      if (cfg.authRpId === undefined) cfg.authRpId = "localhost";
      if (cfg.authRpName === undefined) cfg.authRpName = "Alarisa";
      if (cfg.authChallengeTtlMs === undefined) cfg.authChallengeTtlMs = 300_000;
      if (cfg.authEnrollmentTtlMs === undefined) cfg.authEnrollmentTtlMs = 900_000;
      if (cfg.authMobSessionTtlMs === undefined) cfg.authMobSessionTtlMs = 7_776_000_000;
      if (cfg.authDeskSessionTtlMs === undefined) cfg.authDeskSessionTtlMs = 15_552_000_000;
      if (cfg.authStepUpTtlMs === undefined) cfg.authStepUpTtlMs = 1_800_000;
      cfg.web = webRuntimeFactory.freeze();
      Object.freeze(cfg);
      factoryFrozen = true;
      frozen = true;
      return proxy;
    };
  }
}

export default class Wrapper {
  constructor() {
    return proxy;
  }
}

export const __deps__ = Object.freeze({
  Factory: Object.freeze({
    webRuntimeFactory: "Fl32_Web_Back_Config_Runtime__Factory$",
  }),
});
