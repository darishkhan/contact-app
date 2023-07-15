import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import contactContext from "../context/contacts/contactContext.js";
import user from "../images/profile.jpg"

const ContactDetail = (props) => {
  const location = useLocation();
  const id = location.pathname.slice(1);

  const goto = useNavigate();

  const context = useContext(contactContext);
  const { contacts, getContacts } = context;

  const [contact, setContact]=useState({name:"", email:"", phone:""})

  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      goto("/login");
    }
    getContacts(props);
    for(let i=0;i<contacts.length;i++)
    {
      if(contacts[i]._id===id){
        setContact({name:contacts[i].name, email:contacts[i].email, phone:contacts[i].phone});
        break;
      }
    }
  }, []);
  console.log(contact);

  
  // const { name, email } = location.state.contact;
  //   console.log(location.state);
  return (
    <>
    <div className="container-fluid">
    <div class="card detail-card" >
  <img src={user} class="card-img-top detail-image my-2 rounded-circle" alt="Contact Image"/>
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
