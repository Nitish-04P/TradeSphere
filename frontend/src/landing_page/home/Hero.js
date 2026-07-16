import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
        />

        <h1 className="mt-5">Invest in everything</h1>

        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>

        <div className="mt-3">
          <Link
            to="/signup"
            className="btn btn-primary fs-5 me-3"
            style={{ width: "180px" }}
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="btn btn-outline-primary fs-5"
            style={{ width: "180px" }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;