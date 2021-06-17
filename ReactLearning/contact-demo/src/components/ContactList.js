import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

class ContactList extends React.Component {
  deleteContactHandler = (id) => {
    console.log("deleteContactHandler..............", id);
    const confirmBox = window.confirm(
        "Do you really want to delete this Contact?"
      )
      if (confirmBox === true) {
        this.props.getContactID(id);
      }
  };

  render() {
    console.log("Here.......................")
    const renderContactList = this.props.contacts.map((contact) => {
      return (
        <ContactCard
          contact={contact}
          clickHandler={this.deleteContactHandler}
          key={contact.id}
        />
      );
    });
    return (
      <div className="main">
        <h2>Contact List</h2>
        <Link to="/contacts/add">
          <button className="ui button blue right">AddContact</button>
        </Link>
        <div className="ui celled list">{renderContactList}</div>
      </div>
    );
  }
}

export default ContactList;
