import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Overall.css";
import axios from "axios";

function Overall() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await axios
        .get("https://api.covid19api.com/world/total")
        .catch((err) => console.log(err.message));
      if (jsonData) setData(jsonData.data);
    };
    fetchData();
  }, []);
  return (
    <div className="overall">
      <Card cases={data?.TotalConfirmed} topic="Total Confirmed" />
      <Card cases={data?.TotalDeaths} topic="Total Deaths" />
      <Card cases={data?.TotalRecovered} topic="Total Recovered" />
    </div>
  );
}

export default Overall;
