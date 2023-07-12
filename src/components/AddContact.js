import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import contactContext from "../context/contacts/contactContext.js";
import { useNavigate } from "react-router-dom";


//This component will handle addition of new contacts
const AddContact = (props) => {
  //using navigate so as to go back to home
  //after the contact is added.
  const goto = useNavigate();

  //context has the necessary add function
  const context = useContext(contactContext);
  const { addContact } = context;

  //we will set state of current contact and then push it
  //into the contacts array
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  // if JWT token not present in local storage
  // i.e., user is not logged in
  // so redirect to login page
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      goto("/login");
    }
  }, []);

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(contact.name, contact.email, contact.phone, props);
    goto("/");
  };

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5 align-items-center">
      <h3 className="mx-3">Add Contact</h3>
      <form onSubmit={handleSubmit}>
        <div className="form align-items-center">
          <div className="form-group my-3 mx-3">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Name"
              onChange={onChange}
            />
            <span className="err">
              {contact.name.length < 4
                && "Name must have more than 3 characters"}
            </span>
          </div>
          <div className="form-group my-3 mx-3">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3 mx-3">
            <label htmlFor="exampleInputPassword1">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              onChange={onChange}
            />
            <span className="err">
              {contact.phone.length < 10 || contact.phone.length > 12
                ? "Phone number should have 10-12 digits"
                : (!isFinite(contact.phone) || contact.phone.includes(".")) &&
                  "Phone number must consist of numerical digits only"}
            </span>
          </div>
        </div>
        <button
          disabled={
            contact.name.length < 4 ||
            contact.phone.length < 10 ||
            contact.phone.length > 12 ||
            !isFinite(contact.phone) ||
            contact.phone.includes(".")
          }
          type="submit"
          className="btn btn-primary my-3 mx-3"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};
export default AddContact;
