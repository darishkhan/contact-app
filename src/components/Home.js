import React from "react";
import ContactList from "./ContactList.js";

const Home = (props) => {
  return (
    <>
      <ContactList showAlert={props.showAlert}/>
    </>
  );
};

export default Home;
