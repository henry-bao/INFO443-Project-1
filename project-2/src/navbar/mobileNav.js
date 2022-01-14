import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import MenuToggle from './menuToggle';
import Access from './access';

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 10;
`;

const LinksWrapper = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
    background-color: #4b2e83;
    width: 100%;
    flex-direction: column;
    position: absolute;
    top: 90px;
    left: 0;
    align-items: center;
`;

const LinkItem = styled.li`
    width: 100%;
    padding: 0 1.1em;
    font-size: 30px;
    display: flex;
    color: white;
    font-weight: 500;
    margin-top: 3em;
    margin-bottom: 5px;
    justify-content: center;
`;
const MarginTop = styled.div`
    margin-top: 6em;
`;

export default function Burger(props) {
    const [isOpen, setOpen] = useState(false);

    return (
        <NavLinksContainer>
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen && (
                <LinksWrapper>
                    <LinkItem>
                        <NavLink
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            className="navlink"
                            to="/main"
                            onClick={() => setOpen(!isOpen)}
                        >
                            Home
                        </NavLink>
                    </LinkItem>
                    <LinkItem>
                        <NavLink
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            className="navlink"
                            to="/ranking"
                            onClick={() => setOpen(!isOpen)}
                        >
                            Ranking
                        </NavLink>
                    </LinkItem>
                    <MarginTop />
                    <Access buttonWord={props.buttonWord} setOpen={setOpen} isOpen={isOpen} />
                </LinksWrapper>
            )}
        </NavLinksContainer>
    );
}
