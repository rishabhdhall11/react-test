import React, { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import UpdateContact from "./UpdateContact";
import ContactDetail from "./ContactDetail";
import { uuid } from "uuidv4";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import api from "../api/contact";

function Contact({ match }) {
  const LOCAL_STORAGE_KEY = "contacts";
  console.log("match ...................", match);

  // const contacts = [
  //   { id: 1, name: "Rishabh", email: "rishabh.dhall@gmail.com" },
  //   { id: 2, name: "Akanaksh", email: "akanksha.dhall@gmail.com" },
  // ];
  const [contacts, setContacts] = useState([]);
  let { path, url } = useRouteMatch();

  //Retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log("addContactHandler...........", contact);
    const request = { id: uuid(), ...contact };
    const response = await api.post("/contacts", request);
    const contactUpdate = [...contacts, response.data];
    setContacts(contactUpdate);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  useEffect(() => {
    /// api call get
    // const retrieveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrieveContacts) setContacts(retrieveContacts);
    console.log("Get local...................", contacts);
    const getAllContacts = async () => {
      const retrieveContactsResponse = await retrieveContacts();
      if (retrieveContactsResponse) setContacts(retrieveContactsResponse);
    };
    getAllContacts();
  }, []);

  // useEffect(() => {
  //   console.log("Set local...................", contacts);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Switch>
        <Route
            path={`${url}`}
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactID={removeContactHandler}
              />
            )}
          />
          <Route
            path={`${url}/list`}
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactID={removeContactHandler}
              />
            )}
          />
          <Route
            path={`${url}/add`}
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path={`${url}/update`}
            render={(props) => (
              <UpdateContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route
            path={`${url}/contactdetail/:id`}
            render={(props) => <ContactDetail {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Contact;
