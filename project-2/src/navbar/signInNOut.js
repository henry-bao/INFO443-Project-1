import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignInNOut(props) {
    return (
        <NavLink
            className="loginbutton"
            style={{ color: 'white', textDecoration: 'none' }}
            to={props.signInStatus ? '/' : '/signin'}
            onClick={() => {
                props.handleSignout(props.signInStatus);
                if (props.setOpen) props.setOpen(!props.isOpen);
            }}
        >
            {props.signInStatus ? 'Sign out' : 'Sign in'}
        </NavLink>
    );
}
