import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  console.log("Summary Loaded");
  console.log(localStorage.getItem("userName"));
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const totalInvestment = holdings.reduce(
    (total, stock) => total + stock.avg * stock.qty,
    0
  );

  const currentValue = holdings.reduce(
    (total, stock) => total + stock.price * stock.qty,
    0
  );

  const totalPL = currentValue - totalInvestment;

  const profitPercent =
    totalInvestment > 0
      ? ((totalPL / totalInvestment) * 100).toFixed(2)
      : 0;

  const userName = localStorage.getItem("userName") || "User";

  return (
    <>
      <div className="username">
        <h6>Hi, {userName}! 👋</h6>
        <hr className="divider" />
      </div>

      {/* Equity */}

      <div className="section">
        <span>
          <p>Portfolio</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹ {currentValue.toFixed(2)}</h3>
            <p>Current Portfolio Value</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Total Investment
              <span> ₹ {totalInvestment.toFixed(2)}</span>
            </p>

            <p>
              Holdings
              <span> {holdings.length}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      {/* Profit */}

      <div className="section">
        <span>
          <p>Overall Performance</p>
        </span>

        <div className="data">
          <div className="first">
            <h3
              className={totalPL >= 0 ? "profit" : "loss"}
            >
              ₹ {totalPL.toFixed(2)}

              <small>
                {" "}
                {totalPL >= 0 ? "+" : ""}
                {profitPercent}%
              </small>
            </h3>

            <p>Total P&L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value
              <span> ₹ {currentValue.toFixed(2)}</span>
            </p>

            <p>
              Investment
              <span> ₹ {totalInvestment.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;