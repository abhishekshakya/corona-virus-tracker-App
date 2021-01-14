import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Countrywise.css";
import Graph from "./Graph";
import Axios from "axios";

function Countrywise() {
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [choice, setChoice] = useState("");
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState([]);
  const [recoverPoints, setRecoverPoints] = useState([]);
  const [deathPoints, setDeathPoints] = useState([]);
  const [confirmedPoints, setConfirmedPoints] = useState([]);
  const [flag, setFlag] = useState("");

  const compare = (a, b) => {
    if (a.Country > b.Country) {
      return 1;
    } else if (a.Country < b.Country) {
      return -1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await Axios.get("https://api.covid19api.com/countries");
      // const jsonData = await data.json();
      console.log(jsonData.data.sort(compare));
      setOptions(jsonData.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await Axios.get(
        `https://api.covid19api.com/total/dayone/country/${choice}`
      ).catch((err) => {
        console.log(err.message);
      });
      // const jsonData = await data.json();
      // console.log(jsonData);
      if (jsonData) {
        setData(jsonData.data[jsonData.data.length - 1]);
        setLabels(jsonData.data.map((point) => point.Date));
        setConfirmedPoints(jsonData.data.map((point) => point.Confirmed));
        setRecoverPoints(jsonData.data.map((point) => point.Recovered));
        setDeathPoints(jsonData.data.map((point) => point.Deaths));
      }
    };
    fetchData();
  }, [choice]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(option);
    const obj = options.find((key) => key.Slug === option);
    setChoice(option);
    setFlag(
      `https://www.countryflags.io/${obj.ISO2.toLowerCase()}/flat/64.png`
    );
  };

  // console.log(dataList);
  // console.log(option);
  // console.log(labels);

  return (
    <div className="country">
      <div className="country__left">
        <div className="country__selector">
          <select
            placeholder="select"
            onChange={(e) => setOption(e.target.value)}
          >
            {options.map((country) => (
              <option key={country.ISO2} value={country.Slug}>
                {country.Country}
              </option>
            ))}
          </select>
          <input value="Submit" type="submit" onClick={submitHandler} />
        </div>
        <div className="country__name">
          <span>{choice}</span>
          <img src={flag} alt="" />
        </div>
        <div className="country__info">
          <div className="media__1">
            <Card cases={data?.Confirmed} topic="Total Confirmed" small />
            <Card cases={data?.Deaths} topic="Total Deaths" small />
          </div>
          <div className="media__2">
            <Card cases={data?.Recovered} topic="Total Recovered" small />
            <Card cases={data?.Active} topic="Total Active Cases" small />
          </div>
        </div>
      </div>

      <div className="country__charts">
        <Graph
          labels={labels}
          Confirmed={confirmedPoints}
          Deaths={deathPoints}
          Recovered={recoverPoints}
        />
      </div>
    </div>
  );
}

export default Countrywise;
