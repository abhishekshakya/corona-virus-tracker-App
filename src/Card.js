import React, { useEffect } from "react";
import "./Card.css";
import Countup from "react-countup";

function Card({ cases, topic, small }) {
  const numbers = !cases ? 0 : Number(cases);
  const classType = small ? "Smallcard" : "card";
  // console.log(cases);
  return (
    <div className={classType}>
      <p className={`${classType}__topic`}>{topic}</p>
      <p className={`${classType}__numbers`}>
        {/* {numbers} */}
        <Countup end={numbers} duration={1} />
      </p>
    </div>
  );
}

export default Card;
