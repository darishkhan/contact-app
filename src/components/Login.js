import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:5000";

  const history = useNavigate();

  const [info, setInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: info.email, password: info.password }),
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("success", "Login successful!");
        history("/");
      } else {
        props.showAlert("danger", "Invalid credentials.");
      }
    } catch (error) {
      props.showAlert(
        "danger",
        "Sever under maintenance. Please try again later."
      );
    }
  };

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h3 className="my-4">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>

      <div className="my-3" style={{ height: "50px" }}>
        <span>
          If you don't have an account, then <Link to="/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
