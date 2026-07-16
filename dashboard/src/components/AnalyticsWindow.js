import React from "react";
import { Link } from "react-router-dom";

import { VerticalGraph } from "./VerticalGraph";
import { DoughnutChart } from "./DoughnoutChart";

import "./BuyActionWindow.css";

const AnalyticsWindow = ({ stock, close }) => {
  if (!stock) return null;

  const investment = stock.avg * stock.qty;
  const currentValue = stock.price * stock.qty;
  const profit = currentValue - investment;
  const profitPercent = (
    (profit / investment) *
    100
  ).toFixed(2);

  const barData = {
    labels: ["Investment", "Current Value"],
    datasets: [
      {
        label: stock.name,
        data: [investment, currentValue],
        backgroundColor: [
          "rgba(54,162,235,0.7)",
          "rgba(75,192,192,0.7)",
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["Investment", "Profit"],
    datasets: [
      {
        data: [investment, Math.max(profit, 0)],
        backgroundColor: [
          "#36A2EB",
          "#4BC0C0",
        ],
      },
    ],
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">

        <h3 style={{ textAlign: "center" }}>
          📊 Stock Analytics
        </h3>

        <table
          className="table"
          style={{ marginTop: "20px" }}
        >
          <tbody>
            <tr>
              <td><b>Stock</b></td>
              <td>{stock.name}</td>
            </tr>

            <tr>
              <td><b>Quantity</b></td>
              <td>{stock.qty}</td>
            </tr>

            <tr>
              <td><b>Average Price</b></td>
              <td>₹ {stock.avg.toFixed(2)}</td>
            </tr>

            <tr>
              <td><b>Current Price</b></td>
              <td>₹ {stock.price.toFixed(2)}</td>
            </tr>

            <tr>
              <td><b>Investment</b></td>
              <td>₹ {investment.toFixed(2)}</td>
            </tr>

            <tr>
              <td><b>Current Value</b></td>
              <td>₹ {currentValue.toFixed(2)}</td>
            </tr>

            <tr>
              <td><b>Profit / Loss</b></td>
              <td
                style={{
                  color:
                    profit >= 0
                      ? "green"
                      : "red",
                }}
              >
                ₹ {profit.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td><b>Return</b></td>
              <td
                style={{
                  color:
                    profit >= 0
                      ? "green"
                      : "red",
                }}
              >
                {profitPercent}%
              </td>
            </tr>

            <tr>
              <td><b>Day Change</b></td>
              <td>{stock.day}</td>
            </tr>
          </tbody>
        </table>

        <VerticalGraph data={barData} />

        <div
          style={{
            width: "300px",
            margin: "30px auto",
          }}
        >
          <DoughnutChart data={doughnutData} />
        </div>
      </div>

      <div className="buttons">
        <Link
          className="btn btn-grey"
          onClick={close}
        >
          Close
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsWindow;