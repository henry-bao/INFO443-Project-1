import React from 'react';
import styled from 'styled-components';
import Access from './access';
import Logo from './logo';
import NavLinks from './navlinks';
import { useMediaQuery } from 'react-responsive';
import Burger from './mobileNav';

const NavBarContainer = styled.div`
    width: 100%;
    height: 100px;
    box-shadow: 0 1px 3px rbga(15, 15, 15, 0.13);
    display: flex;
    align-items: center;
    padding: 0 3em;
    background-color: #4b2e83;
    font-family: 'Encode Sans', sans-serif;
`;

const Left = styled.div`
    display: flex;
    flex: 10;
`;

const Middle = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-right: 35px;
`;

const Right = styled.div`
    display: flex;
`;

export default function NavBar(props) {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return (
        <NavBarContainer>
            <Left>
                <Logo isMobile={isMobile} />
            </Left>
            <Middle>{!isMobile && <NavLinks />}</Middle>
            <Right>
                {!isMobile && <Access buttonWord={props.buttonWord} />}
                {isMobile && <Burger buttonWord={props.buttonWord} />}
            </Right>
        </NavBarContainer>
    );
}
