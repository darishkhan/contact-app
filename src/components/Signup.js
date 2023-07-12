import React, { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const host = "http://localhost:5000";

  const hist = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // const validateEmail=(email)=>{
  //   let at=-1;
  //   let dot=-1;
  //   for(let i=0;i<email.length;i++)
  //   {
  //     if(email[i]==='@' && at===-1) at=i;
  //     if(email[i]=='.') && at===
  //   }

  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(info);
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: info.name,
          email: info.email,
          password: info.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("success", "Sign up successful!");
        hist("/");
      } else {
        props.showAlert("danger", json.errors[0].msg);
      }
    } catch (error) {
      console.log(error);
      props.showAlert("danger", "Server under maintenance");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Signup</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            onChange={onChange}
            required
            minLength={4}
          />
          <span className="err">
            {info.name.length > 0 &&
              info.name.length < 4 &&
              "Name should have atleast 4 characters"}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
            minLength={5}
            maxLength={30}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            required
          />
          <span className="err">
            {info.password !== info.cpassword && "Passwords do not match"}
          </span>
        </div>
        <button
          disabled={info.password !== info.cpassword || info.name.length < 4}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
      <div className="my-3" style={{ height: "50px" }}>
        <span>
          If you already have an account, then <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
