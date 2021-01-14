import React from "react";
import Countrywise from "./Countrywise";
import Overall from "./Overall";
import "./body.css";

function Body() {
  return (
    <div className="body">
      <Overall />
      <Countrywise />
    </div>
  );
}

export default Body;
