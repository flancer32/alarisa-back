declare global {
  type Alarisa_Back_Config_Runtime = typeof import("./src/Config/Runtime.mjs").default;
  type Alarisa_Back_Config_Runtime$ = InstanceType<Alarisa_Back_Config_Runtime>;
  type Alarisa_Back_Config_Runtime__Data = import("./src/Config/Runtime.mjs").Data;
  type Alarisa_Back_Config_Runtime__Factory = typeof import("./src/Config/Runtime.mjs").Factory;
  type Alarisa_Back_Config_Runtime__Factory$ = InstanceType<Alarisa_Back_Config_Runtime__Factory>;

  type Alarisa_Back_Ingress_Human = typeof import("./src/Ingress/Human.mjs").default;
  type Alarisa_Back_Ingress_Human$ = InstanceType<Alarisa_Back_Ingress_Human>;

  type Alarisa_Back_Node_FsPromises = typeof import("node:fs/promises");
  type Alarisa_Back_Node_Path = typeof import("node:path");
}

export {};
