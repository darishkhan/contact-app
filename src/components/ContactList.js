import React, { useContext, useEffect, useState } from "react";
import contactContext from "../context/contacts/contactContext.js";
import ContactCard from "./ContactCard.js";
import { useNavigate } from "react-router-dom";

//this is the contact list component
//it contains the contact list and search bar.
const ContactList = (props) => {
  //using useNavigate to redirect to login page if not logged in.
  const goto = useNavigate();

  //using contect to access functions from contact state.
  const context = useContext(contactContext);

  const { contacts, getContacts, updateContact, deleteContact } = context;
  const [toFind, setToFind] = useState("");


  const [contactjson, setContactjson] = useState({_id:"",name:"ok", email:"", phone:""});
  const [id, setId] = useState(""); 

  useEffect(() => {
    //check for login
    if (!localStorage.getItem("token")) {
      goto("/login");
    }
    //gives two arguments toFind and props
    // toFind is whatever is typed in the search bar
    // if toFind is empty full list is returned
    getContacts(toFind, props);
  }, [toFind]);

  const editContact=(_id, name, email, phone)=>{
    setContactjson({_id, name, email, phone});
}

const handleSubmit=(e)=>{
  e.preventDefault();
  updateContact(contactjson, props);
  getContacts(toFind, props);
}

const onChange = (e) => {
  setContactjson({ ...contactjson, [e.target.name]: e.target.value });
};

const removeContact=(_id)=>{
  setId(_id);
}

  return (
    <>

    {/* edit modal */}
    <div
        className="modal fade"
        id="editModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalCenterTitle">
                Edit contact
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="container mt-5 align-items-center">
      <form>
        <div className="form align-items-center">
          <div className="form-group my-3 mx-3">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={contactjson.name}
              onChange={onChange}
            />
            <span className="err">
              {contactjson.name.length < 4 &&
                "Name must have more than 3 characters"}
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
              value = {contactjson.email}
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
              value={contactjson.phone}
            />
            <span className="err">
              {contactjson.phone.length < 10 || contactjson.phone.length > 12
                ? "Phone number should have 10-12 digits"
                : (!isFinite(contactjson.phone) || contactjson.phone.includes(".")) &&
                  "Phone number must consist of numerical digits only"}
            </span>
          </div>
        </div>
        
      </form>
    </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={
            contactjson.name.length < 4 ||
            contactjson.phone.length < 10 ||
            contactjson.phone.length > 12 ||
            !isFinite(contactjson.phone) ||
            contactjson.phone.includes(".")} onClick={handleSubmit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
        
      </div>


      {/* delete modal */}
      <div
        className="modal fade"
        id="deleteModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalCenterTitle">
                Delete contact?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this contact?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteContact(id, props);
                }}
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>


      
      <div className="container-fluid contact-list">
        <h2 className="mx-3 my-3">Contact List</h2>
        <form className="search" onSubmit={(e) =>{e.preventDefault();console.log("searching...")}}>
          <div className="row ">
            <input
              className="col form-control mr-sm-2 d-inline"
              type="search"
              name="search"
              onChange={(e) => setToFind(e.target.value)}
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
                editContact={editContact}
                removeContact={removeContact}
                showAlert={props.showAlert}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
