import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { WasmContext } from "./Context";

import App from "./App";
import Loading from "./Loading";

const Index = () => {
  /* Store wasm functions in context for quick and easy access */
  const [wasm, setWasm] = useState({});

  useEffect(() => {
    /* Import wasm functions */

    import("../pkg/index.js")
      .then((rust) => {
        setWasm({ ...rust, error: false });
      })
      .catch((error) => setWasm({ error }));
  }, []);

  return (
    <React.StrictMode>
      {/* If wasm object is empty render loading screen */}
      {Object.keys(wasm).length === 0 ? (
        <Loading error={wasm.error} />
      ) : (
        <>
          <WasmContext.Provider value={wasm}>
            <App />
          </WasmContext.Provider>
        </>
      )}
    </React.StrictMode>
  );
};
ReactDOM.render(<Index />, document.getElementById("root"));
