import React, { useContext } from "react";
import user from "../images/profile.jpg";
import contactContext from "../context/contacts/contactContext.js";
import { Link } from "react-router-dom";
// import Editcontactjson from "./Editcontact.js";

//this is the contact card component
const ContactCard = (props) => {
  //we are using context to easily access all the functions
  //initialised in contactjsonState
  const context = useContext(contactContext);
  const { deleteContact } = context;

  //destructuring to obtain id, name and email
  const { _id, name, email, phone } = props.contact;
  const editContact = props.editContact;
  const removeContact = props.removeContact;



  return (
    <>




      <div className="card my-1 mx-3 col-xl-6 your-contact-card">
        <div className="row p-3">
          <div className="col-3">
            <img
              src={user}
              className="rounded-circle d-inline your-image-class img-fluid"
              alt="..."
            />
          </div>
          <div className="col-7">
            <Link className="card-info" to={"/" + _id}>
              <h5>{name}</h5>
              <p>{email}</p>
            </Link>
          </div>
          <div className=" col-1 align-items-center">
            <div className="col-2">
              <i
                className="fa-solid fa-trash"
                data-toggle="modal"
                data-target="#deleteModalCenter"
                onClick={()=>{removeContact(_id)}}
              ></i>
              <i
                className="fa-regular fa-pen-to-square inline"
                data-toggle="modal"
                data-target="#editModalCenter"
                onClick={()=>{editContact(_id, name, email, phone)}}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
