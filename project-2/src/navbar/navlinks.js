import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
`;

const LinkItem = styled.li`
    height: 100%;
    padding: 0 1.1em;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    border-top: 2px solid transparent;
    transition: all 220ms ease-in-out;
    display: flex;
    color: white;
    font-weight: 500;

    &:hover {
        transition: all 0.3s ease 0s;
        color: #85754d;
        border-top: 2px solid #b7a57a;
    }
`;

export default function NavLinks(props) {
    return (
        <NavLinksContainer>
            <LinksWrapper>
                <LinkItem>
                    <NavLink
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        className="navlink"
                        to="/main"
                    >
                        Home
                    </NavLink>
                </LinkItem>
                <LinkItem>
                    <NavLink
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        className="navlink"
                        to="/ranking"
                    >
                        Ranking
                    </NavLink>
                </LinkItem>
            </LinksWrapper>
        </NavLinksContainer>
    );
}
