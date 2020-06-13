const path = require("path");

const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const { removeModuleScopePlugin } = require("customize-cra");

module.exports = function override(config, env) {
  config.plugins.push(new WasmPackPlugin({ crateDirectory: __dirname }));
  removeModuleScopePlugin()(config);
  const wasmExtensionRegExp = /\.wasm$/;
  config.resolve.extensions.push(".wasm");
  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  // Add a dedicated loader for WASM
  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, "src"),
    use: [{ loader: require.resolve("wasm-loader"), options: {} }],
  });
  return config;
};
