import { useState } from "react";
import ContactContext from "./contactContext.js";
const ContactState = (props) => {
  const host = "http://localhost:5000";

  const contactsInitial = [];
  const [contacts, setContacts] = useState(contactsInitial);

  //Get all contacts
  const getContacts = async (toFind, props) => {
    try {
      const response = await fetch(`${host}/api/contacts/fetchallcontacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      function SortBy(prop) {
        return function (a, b) {
          if (a[prop] > b[prop]) {
            return 1;
          } else if (a[prop] < b[prop]) {
            return -1;
          } else return 0;
        };
      }

      console.log(toFind);
      let newjson = json.sort(SortBy("name"));

      newjson = newjson.filter((contact) => {
        return (contact.name.includes(toFind) || contact.email.includes(toFind) || contact.phone.includes(toFind))
      });
      setContacts(newjson);
    } catch (error) {
      // console.log(error);
      props.showAlert("danger", "Server under maintenace, Try again later.");
    }
  };

  //get a single contact with this id
  const getContact = (id)=>{
    for(let i = 0;i<contacts.length;i++)
    {
      if(contacts[i]._id===id) return {name:contacts[i].name, email:contacts[i].email, phone:contacts[i].phone};
    }
    return null;
  }

  //Add a contact
  const addContact = async (name, email, phone, props) => {
    try {
      const response = await fetch(`${host}/api/contacts/addcontact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, email, phone }),
      });
      const json = await response.json();
      console.log(response.status);

      if (response.status === 201) {
        props.showAlert("warning", "Email or phone number already exists!");
        return;
      }

      if (response.status === 400) {
        props.showAlert("danger", "Invalid email or phone number!");
        return;
      }

      // console.log(json);
      // newjson = {json.name, json.email, json.phone}

      setContacts([...contacts, json.savedContact]);
      props.showAlert("success", "Contact added successfully");
    } catch (error) {
      // console.log(error);
      props.showAlert("danger", "Server under maintenace, Try again later.");
    }
  };

  //delete a contact
  const deleteContact = async (id, props) => {
    try {
      const response = await fetch(`${host}/api/contacts/deletecontact/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      // eslint-disable-next-line
      const json = await response.text();
      console.log(json);
      if(response.status===404)
      {
        return props.showAlert("danger", json);
      }
      if(response.status===401){
        return props.showAlert("danger", json);
      }
      if(response.status===500){
        return props.showAlert("danger", json);
      }

      const newContact = contacts.filter((contact) => {
        return contact._id !== id;
      });
      setContacts(newContact);
      props.showAlert("success", "contact deleted successfully.")
    } catch (error) {
      props.showAlert("danger", "server under maintenance, try again later.")
    }
    
  };

  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, addContact, deleteContact, getContacts, getContact }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
