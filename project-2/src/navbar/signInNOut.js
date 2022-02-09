import React from "react";
import firebase from "firebase";
import { NavLink } from "react-router-dom";

const handleSignout = (signInStatus) => {
  if (signInStatus) {
    firebase.auth().signOut();
  }
};

export default function SignInNOut(props) {
  return (
    <NavLink
      className="loginbutton"
      style={{ color: "white", textDecoration: "none" }}
      to={props.signInStatus ? "/" : "/signin"}
      onClick={() => {
        handleSignout(signInStatus);
        if (props.setOpen) props.setOpen(!props.isOpen);
      }}
    >
      {props.statusWord}
    </NavLink>
  );
}
