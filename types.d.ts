declare global {
  type Alarisa_Back_Config_Runtime = typeof import("./src/Config/Runtime.mjs").default;
  type Alarisa_Back_Config_Runtime$ = InstanceType<Alarisa_Back_Config_Runtime>;
  type Alarisa_Back_Config_Runtime__Data = import("./src/Config/Runtime.mjs").Data;
  type Alarisa_Back_Config_Runtime__Factory = typeof import("./src/Config/Runtime.mjs").Factory;
  type Alarisa_Back_Config_Runtime__Factory$ = InstanceType<Alarisa_Back_Config_Runtime__Factory>;

  type Alarisa_Back_Ingress_Human = typeof import("./src/Ingress/Human.mjs").default;
  type Alarisa_Back_Ingress_Human$ = InstanceType<Alarisa_Back_Ingress_Human>;

  type Alarisa_Back_Auth_Service = typeof import("./src/Auth/Service.mjs").default;
  type Alarisa_Back_Auth_Service$ = InstanceType<Alarisa_Back_Auth_Service>;
  type Alarisa_Back_Auth_Store = typeof import("./src/Auth/Store.mjs").default;
  type Alarisa_Back_Auth_Store$ = InstanceType<Alarisa_Back_Auth_Store>;
  type Alarisa_Back_Auth_WebAuthn = typeof import("./src/Auth/WebAuthn.mjs").default;
  type Alarisa_Back_Auth_WebAuthn$ = InstanceType<Alarisa_Back_Auth_WebAuthn>;

  type Alarisa_Back_Node_Crypto = typeof import("node:crypto");
  type Alarisa_Back_Node_FsPromises = typeof import("node:fs/promises");
  type Alarisa_Back_Node_Path = typeof import("node:path");
}

export {};
