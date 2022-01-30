import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './landing';
import {BarSection} from './barsection';
import NavBar from './navbar/navbar';
import Card from './carddeck';
import Access from './navbar/access';
// import MockDatabase from './firebaseMock';


describe('Landing Page', () => {
    test('Renders without crashing', () => {
        render(
            <BrowserRouter>
                <LandingPage isMobile={false} />
            </BrowserRouter>
        );
    });
    test('NavLink routes to /main', () => {
        render(
            <BrowserRouter>
                <LandingPage isMobile={false} />
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

describe('barsection', () => {
    const mock_cards = [
        {cate:"Hobby", contact: "(123)456-7890", date: 1616574317558, description: "Learn Guitar", id: "Goals", img: "../img/guitar.png", key: "1", people: 28, titile:"Guitar"},
        {cate:"Health", contact: "(123)456-7890", date: 1616584317558, description: "Well beings", id: "Goals", img: "../img/smash.png", key: "3", people: 26, titile:"Wellbeing"},
        {cate:"Health", contact: "(123)456-7890", date: 1616594317558, description: "Mental Health", id: "Goals", img: "../img/smash.png", key: "3", people: 26, titile:"Mental"}
    ];
    const mock_handleFilter = jest.fn();
    const mock_handleSearch = jest.fn();

    test('barsection renders without crashing', () => {
        render(
            <BrowserRouter>
                <BarSection 
                    data={mock_cards}    
                    handleFilter={mock_handleFilter} 
                    handleSearch={mock_handleSearch}
                />
            </BrowserRouter>
        );
        expect(screen.getAllByRole('button').length).toEqual(5);
        expect(screen.getByText('Show all')).toBeInTheDocument();
        expect(screen.getByText('Health')).toBeInTheDocument();
        expect(screen.getByText('Career')).toBeInTheDocument();
        expect(screen.getByText('Hobby')).toBeInTheDocument();
        expect(screen.getByText('School')).toBeInTheDocument();
        expect(mock_cards.filter(card => card.cate == 'Hobby').length).toEqual(1);
        expect(mock_cards.filter(card => card.cate == 'Health').length).toEqual(2);
    });

    test('filter and search button works properly', () => {
        render(
            <BrowserRouter>
                <BarSection 
                    data={mock_cards}    
                    handleFilter={mock_handleFilter} 
                    handleSearch={mock_handleSearch}
                />
            </BrowserRouter>
        );
        const filter_button = screen.getByText('Health');
        userEvent.click(filter_button);
        expect(mock_handleFilter).toHaveBeenCalled();

        userEvent.type(screen.getByRole('searchbox'), 'Health');
        expect(mock_handleSearch).toHaveBeenCalled();
        expect(screen.getByRole('searchbox')).toHaveValue('Health');
    });

});

describe('navagation bar', () => {
    const resizeWindow = (width, height) => {
        window.innerWidth = width
        window.innerHeight = height
        window.dispatchEvent(new Event('resize'))
    }

    test('navagation bar renders without crashing', () => {
        render(
            <BrowserRouter>
                <NavBar
                    buttonWord='Sign in'
                />
            </BrowserRouter>
        );
        expect(screen.getByText('Sign in')).toBeInTheDocument;
        expect(screen.getByText('Ranking')).toBeInTheDocument;
        expect(screen.getByText('Home')).toBeInTheDocument;
        expect(screen.getByText('Goal Husky!')).toBeInTheDocument;

        resizeWindow(700, 1000);
        render(
            <BrowserRouter>
                <NavBar
                    buttonWord='Sign in'
                />
            </BrowserRouter>
        );
        const signInButton = filter(screen.getAllByRole('link'), ()=>{
            
        });
        expect(signInButton).not.toBeInTheDocument();
    });

    test('navagation bar changes with screen size', () => {

        render(
            <BrowserRouter>
                <NavBar
                    buttonWord='Sign in'
                />
            </BrowserRouter>
        );
        let signInButton = screen.getByText('Sign in');
        expect(signInButton).toBeInTheDocument();
    })
})

describe('carddeck', () => {

});

