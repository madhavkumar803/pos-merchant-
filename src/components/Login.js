import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  let history = useHistory();
  return (
    <div className="container">
      <form className="form1">
        <h3>User Login</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <Link to="/userDashboard">
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </Link>

        <p className="forgot-password text-right">
          Donot have an account{" "}
          <Link to="" className="text-black">
            sign up?
          </Link>
        </p>
      </form>

      <form className="form1">
        <h3>Admin Login</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <Link to="/adminDashboard">
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </Link>

        <p className="forgot-password text-right">
          Donot have an account{" "}
          <Link to="/signup" className="text-black">
            sign up?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
