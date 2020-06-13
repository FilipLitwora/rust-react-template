import React, { useContext } from "react";

import { WasmContext } from "./Context";

const App = () => {
  const wasm = useContext(WasmContext);
  return (
    <>
      <h3> 5 + 4 = {wasm.add(5, 4)}</h3>
    </>
  );
};

export default App;
