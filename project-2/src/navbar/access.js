import React from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';

const handleSignout = (input) => {
    let word = input.target.outerText;
    if (word === 'Sign out') {
        firebase.auth().signOut();
    }
};

export default function Access(props) {
    return (
        <NavLink
            className="loginbutton"
            style={{ color: 'white', textDecoration: 'none' }}
            to={props.buttonWord === 'Sign in' ? '/signin' : '/'}
            onClick={(event) => {
                handleSignout(event);
                if (props.setOpen) props.setOpen(!props.isOpen);
            }}
        >
            {props.buttonWord}
        </NavLink>
    );
}