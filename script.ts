const replace = require("replace-in-file");

if (process.platform === "win32") {
  // let options = {
  //   files: "node_modules/@generated/photon/runtime/index.js",
  //   from: "await this.resolveAlternativeBinaryPath()",
  //   to:
  //     '"C:\\\\Users\\\\Sticky\\\\Code\\\\prisma2test\\\\backend\\\\node_modules\\\\@generated\\\\photon\\\\runtime\\\\query-engine-windows.exe" '
  // };
  // replace(options, (error: any, results: any) => {
  //   if (error) {
  //     return console.error("Error occurred:", error);
  //   }
  //   console.log("Replacement results:", results);
  // });
  // options = {
  //   files: "node_modules/@generated/nexus-prisma/index.js",
  //   from: "return value",
  //   to: "return new Date(value.value)"
  // };
  // replace(options, (error: any, results: any) => {
  //   if (error) {
  //     return console.error("Error occurred:", error);
  //   }
  //   console.log("Replacement results:", results);
  // });
}
