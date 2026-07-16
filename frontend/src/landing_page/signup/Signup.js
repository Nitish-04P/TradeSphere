import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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
        "http://localhost:3002/signup",
        user
      );

      alert(res.data.message);
      window.location.href = "/login";

      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong"
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
          Create TradeSphere Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={user.phone}
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
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;