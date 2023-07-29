import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import contactContext from "../context/contacts/contactContext.js";
import user from "../images/profile.jpg";

//this is the contact detail component which shows the contact
//in a new page in full detail
const ContactDetail = (props) => {
  //we are using useLocation to read the current url
  // and extract id from it.
  const location = useLocation();
  const id = location.pathname.slice(1);

  //using goto so as to direct the user back to home page
  //when he/she clicks on the back button
  const goto = useNavigate();

  //using context so as to access the functions
  //initialized in the contact state
  const context = useContext(contactContext);
  const { contacts, getContacts } = context;

  //initializing an empty contact which we will update
  //with the actual requested contact
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  //check if the user is logged in or not
  useEffect(() => {
    //if not logged in, navigate to the login page.
    if (!localStorage.getItem("token")) {
      goto("/login");
    }

    //fetch all contacts.
    getContacts(props);
    for (let i = 0; i < contacts.length; i++) {
      //check for the requested contact.
      if (contacts[i]._id === id) {
        setContact({
          name: contacts[i].name,
          email: contacts[i].email,
          phone: contacts[i].phone,
        });
        break;
      }
    }
  }, []);
  console.log(contact);

  return (
    <>
      <div className="container-fluid">
        <div class="card detail-card">
          <img
            src={user}
            class="card-img-top detail-image my-2 rounded-circle"
            alt="Contact Image"
          />
          <div class="card-body">
            <h3 class="card-title">{contact.name}</h3>
            <h5 class="card-text">{contact.email}</h5>
            <h5 class="card-text">{contact.phone}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactDetail;
