import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

const CardContact = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt={user}></img>
      <div className="content">
        <Link
          to={{
            pathname: `/contacts/contactdetail/${id}`,
            state: { contact: props.contact },
          }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>

      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link
        to={{
          pathname: `/update`,
          state: {  contact: props.contact  },
        }}
      >
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default CardContact;