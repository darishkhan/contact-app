import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//this is the Navigation Bar component
const Header = () => {
  // we use useLocation to know which url we are currently in
  const loc = useLocation();
  const goto = useNavigate();

  //logic to highlight the section whose url is open
  let isHomeActive = "nav-item ";
  let isAddActive = "nav-item ";
  if (loc.pathname === "/add") isHomeActive += "active";
  else isAddActive += "active";

  const logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    goto("/login");
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">
          Contact App
        </Link>
        {/* this button will appear when we switch to small screen. */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* this part will collapse on small screen */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={isAddActive}>
              <Link className="nav-link" to="/" >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className={isHomeActive}>
              <Link className="nav-link" to="/add">
                Add Contact
              </Link>
            </li>
          </ul>

          {/* this part will have the sign up and login buttons */}
          {(!localStorage.getItem('token')) ? 
          <form className="form-inline my-2 my-lg-0">
            <Link className="btn  my-2 mx-1 my-sm-0" to="/signup" type="submit">
              Sign Up
            </Link>
            <Link className="btn my-2 my-sm-0" to="/login" type="submit">
              Login
            </Link>
          </form>
          :
          <form className="form-inline my-2 my-lg-0" onSubmit={logout}>
            <button className="btn  my-2 mx-1 my-sm-0" type="submit">
              Logout
            </button>
          </form>

}
        </div>
      </nav>
    </>
  );
};

export default Header;
