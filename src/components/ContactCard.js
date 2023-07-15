import React, { useContext } from "react";
import user from "../images/profile.jpg";
import contactContext from "../context/contacts/contactContext.js";
import { Link } from "react-router-dom";


const ContactCard = (props) => {
  const context = useContext(contactContext);
  const { deleteContact } = context;

  const { _id, name, email } = props.contact;
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
            <Link className="card-info" to={"/"+_id}>
            <h5>{name}</h5>
            <p>{email}</p>
            </Link>
          </div>
          <div className=" col-1 align-items-center">
            <div className="col-2">
              <i
                className="fa-solid fa-trash"
                onClick={() => {
                  deleteContact(props.contact._id, props);
                }}
              ></i>
              <i className="fa-regular fa-pen-to-square inline"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
