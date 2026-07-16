// @ts-check

/**
 * @namespace Alarisa_Back_Auth_WebAuthn
 * @description Lazy adapter around the SimpleWebAuthn server API.
 */

export default class WebAuthn {
  constructor() {
    let apiPromise;
    const api = () => {
      if (!apiPromise) apiPromise = import("@simplewebauthn/server");
      return apiPromise;
    };

    this.generateRegistrationOptions = async function (params) {
      const library = await api();
      return library.generateRegistrationOptions(params);
    };

    this.verifyRegistrationResponse = async function (params) {
      const library = await api();
      return library.verifyRegistrationResponse(params);
    };

    this.generateAuthenticationOptions = async function (params) {
      const library = await api();
      return library.generateAuthenticationOptions(params);
    };

    this.verifyAuthenticationResponse = async function (params) {
      const library = await api();
      return library.verifyAuthenticationResponse(params);
    };
  }
}
