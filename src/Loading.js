import React from "react";

export default ({ error }) => (
  <>
    {error ? (
      <>
        <h1> Error ! </h1>
        <p>{error}</p>
      </>
    ) : (
      <h1>Loading resources...</h1>
    )}
  </>
);
