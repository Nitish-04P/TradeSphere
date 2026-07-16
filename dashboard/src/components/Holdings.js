import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

useEffect(() => {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:3002/allHoldings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setAllHoldings(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // Total Investment
const totalInvestment = allHoldings.reduce(
  (total, stock) => total + stock.avg * stock.qty,
  0
);

// Current Portfolio Value
const currentValue = allHoldings.reduce(
  (total, stock) => total + stock.price * stock.qty,
  0
);

// Overall Profit / Loss
const totalPL = currentValue - totalInvestment;

// Profit Percentage
const profitPercent =
  totalInvestment > 0
    ? ((totalPL / totalInvestment) * 100).toFixed(2)
    : 0;
    // Total Holdings
const totalHoldings = allHoldings.length;

// Profit Stocks
const profitStocks = allHoldings.filter(
  (stock) => stock.price > stock.avg
).length;

// Loss Stocks
const lossStocks = allHoldings.filter(
  (stock) => stock.price < stock.avg
).length;

// Best Performer
const bestStock =
  allHoldings.length > 0
    ? allHoldings.reduce((best, current) =>
        ((current.price - current.avg) / current.avg) >
        ((best.price - best.avg) / best.avg)
          ? current
          : best
      )
    : null;

// Worst Performer
const worstStock =
  allHoldings.length > 0
    ? allHoldings.reduce((worst, current) =>
        ((current.price - current.avg) / current.avg) <
        ((worst.price - worst.avg) / worst.avg)
          ? current
          : worst
      )
    : null;
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
            <th>Analytics</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                    generalContext.openAnalyticsWindow(stock)
                  }
                 >
                  📊 Analytics
                </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
  <div className="col">
    <h5>₹ {totalInvestment.toFixed(2)}</h5>
    <p>Total Investment</p>
  </div>

  <div className="col">
    <h5>₹ {currentValue.toFixed(2)}</h5>
    <p>Current Value</p>
  </div>

  <div className="col">
    <h5
      style={{
        color: totalPL >= 0 ? "green" : "red",
      }}
    >
      ₹ {totalPL.toFixed(2)}
    </h5>

    <p>{profitPercent}% Overall P&L</p>
  </div>
</div>
      <div
  className="card mt-4 p-3"
  style={{
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <h4>Portfolio Summary</h4>

  <div className="row mt-3">

    <div className="col-md-4">
      <h6>Total Holdings</h6>
      <p>{totalHoldings}</p>
    </div>

    <div className="col-md-4">
      <h6>Profitable Stocks</h6>
      <p style={{ color: "green" }}>
        {profitStocks}
      </p>
    </div>

    <div className="col-md-4">
      <h6>Loss Making Stocks</h6>
      <p style={{ color: "red" }}>
        {lossStocks}
      </p>
    </div>

    <div className="col-md-6 mt-3">
      <h6>Best Performer</h6>
      <p>
        {bestStock
          ? bestStock.name
          : "-"}
      </p>
    </div>

    <div className="col-md-6 mt-3">
      <h6>Worst Performer</h6>
      <p>
        {worstStock
          ? worstStock.name
          : "-"}
      </p>
    </div>

  </div>
</div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
