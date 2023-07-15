//all thr imported libraries
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import AddContact from "./AddContact.js";
import ContactDetail from "./ContactDetail.js";
import Home from "./Home.js";
import Alert from "./Alert.js";
import ContactState from "../context/contacts/ContactState.js";
import Login from "./Login.js";
import Signup from "./Signup.js";

//the main app starts here
function App() {
  //We are making an alert state in which we will set message when
  //we want to give an alert message
  const [alert, setAlert] = useState(null);

  //this will show alert for 1.5 secs
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  //the main app has these components
  return (
    <>
      <ContactState>
        <Router>
          <Header />
          {/* alert is only displayed when it is not null */}
          <Alert alert={alert} />

          <Routes>
            <Route exact path="/add" element={<AddContact showAlert={showAlert} />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/:id" element={<ContactDetail />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </ContactState>
    </>
  );
}

export default App;
