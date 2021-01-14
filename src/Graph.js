import React from "react";
import { Line } from "react-chartjs-2";
import "./graph.css";

function Graph({ labels, Confirmed, Deaths, Recovered }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "confirmed",
        data: Confirmed,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Deaths",
        data: Deaths,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Recovered",
        data: Recovered,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };
  const option = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  // console.log(labels);
  // console.log(Confirmed);
  // console.log(Recovered);
  return (
    <div className="graph">
      {labels.length > 0 && <Line data={data} options={option} />}
    </div>
  );
}

export default Graph;
