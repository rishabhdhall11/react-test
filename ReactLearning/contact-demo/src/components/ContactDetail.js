import React from "react";

const ContactDetail = (props) => {
  console.log(props);
  const { name, email } = props.location.state.contact;
  return (
    <div className="item">
      <img
        className="ui image"
        src="https://picsum.photos/200/300"
        alt="image"
      ></img>
      <div className="header">{name}</div>
      <div>{email}</div>
    </div>
  );
};

export default ContactDetail;
