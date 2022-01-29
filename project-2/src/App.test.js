import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import LandingPage from './landing';
import NavBar from './navbar/navbar';
import Logo from './navbar/logo';

configure({ adapter: new Adapter() });

describe('Landing Page', () => {
    test('Renders without crashing', () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
    });
    test('NavLink routes to /main', () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const navLink = screen.getByText('Find like-minded people to complete your goals with!');
        userEvent.click(navLink);
        expect(navLink).toHaveAttribute('href', '/main');
    });
    test('Text changes on mobile', async () => {
        render(
            <BrowserRouter>
                <LandingPage isMobile={true} />
            </BrowserRouter>
        );
        const navLink = screen.getByText('Click here to start!');
        expect(navLink).toBeInTheDocument();
    });
});

describe('NavBar', () => {
    test("Logo must have a 'src' and an 'alt'", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src');
        expect(logo).toHaveAttribute('alt');
    });
    test('Logo changes on mobile', () => {
        render(
            <BrowserRouter>
                <Logo isMobile={true} />
            </BrowserRouter>
        );
        const src =
            'https://firebasestorage.googleapis.com/v0/b/goal-husky.appspot.com/o/favicon.png?alt=media&token=f3285f01-f19b-4fd3-9a04-fcb10d998463';
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', src);
    });
    test('Sign in and Sign out buttons work', () => {
        render(
            <BrowserRouter>
                <NavBar buttonWord={'Sign in'} />
            </BrowserRouter>
        );
        const signInButton = screen.getByText('Sign in');
        userEvent.click(signInButton);
        expect(signInButton).toHaveAttribute('href', '/signin');

        render(
            <BrowserRouter>
                <NavBar buttonWord={'Sign out'} />
            </BrowserRouter>
        );
        const signOutButton = screen.getByText('Sign out');
        userEvent.click(signOutButton);
        expect(signOutButton).toHaveAttribute('href', '/');
    });
    test('Home and Ranking list button work', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        const navLinks = screen.getAllByRole('link');
        const homeLink = navLinks[1];
        const rankingListLink = navLinks[2];
        expect(homeLink).toHaveAttribute('href', '/main');
        expect(rankingListLink).toHaveAttribute('href', '/ranking');
    });

    test('Burger menu only shows up  when isMobile is true', () => {
        const mobileComponent = shallow(<NavBar isMobile={true} />);
        expect(mobileComponent.text().includes('Burger')).toBeTruthy();

        const nonMobileComponent = shallow(<NavBar isMobile={false} />);
        expect(nonMobileComponent.text().includes('Burger')).toBeFalsy();
    });
});
