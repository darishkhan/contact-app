import React, { useContext, useEffect, useState } from "react";
import contactContext from "../context/contacts/contactContext.js";
import ContactCard from "./ContactCard.js";
import { useNavigate } from "react-router-dom";

const ContactList = (props) => {
  const goto = useNavigate();
  const context = useContext(contactContext);
  const { contacts, getContacts } = context;
  const [toFind, setToFind]=useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      goto("/login");
    }
    getContacts(toFind, props);
  }, [toFind]);

  return (
    <div className="container-fluid contact-list">
      <h2 className="mx-3 my-3">Contact List</h2>
      <form className="search" onSubmit={()=>console.log("searching...")}>
        <div className="row ">
          <input
            className="col form-control mr-sm-2 d-inline"
            type="search"
            name="search"
            onChange={(e)=>setToFind(e.target.value)}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
          >
            Search
          </button>
        </div>
      </form>
      <span className="mx-3">
        {contacts.length === 0 && "No contact to display"}
      </span>
      <ul className="">
        {contacts.map((contact) => {
          return (
            <ContactCard
              key={contact._id}
              contact={contact}
              showAlert={props.showAlert}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
