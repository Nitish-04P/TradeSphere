import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

 
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3002/login",
        user
      );
     console.log("LOGIN RESPONSE");
console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
  "userId",
  res.data.user._id
);

localStorage.setItem(
  "userName",
  res.data.user.name
);

      alert("Login Successful");

      window.location.href =
        "http://localhost:3001";
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto p-4 shadow"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          Login to TradeSphere
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;