import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from './App';
import './index';
import { LandingPage } from './landing';

describe('landing page', () => {
    test('landing page shows up correctly', () => {
        render(<LandingPage />);

        screen.debug();
        expect(screen.getByText('Find like-minded people')).toBeInTheDocument();

        let button = screen.getByRole('button');
        userEvent.click(button);

        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});

describe('landing page', () => {
    test('landing page shows up correctly', () => {
        render('Hi');
        // render(<App />);
        /*
        screen.debug();
        expect(screen.getByText('Find like-minded people')).toBeInTheDocument();

        let button = screen.getByRole('button');
        userEvent.click(button);

        expect(screen.getByText('Home')).toBeInTheDocument();
        */
    });
});

/*
describe('sign in', () => {
    test('sign in page shows up correctly', () => {
        render(<App />);
        screen.debug();
        let button = screen.getByRole('button');
        userEvent.click(button);
        button = screen.getByText('Sign in');
        userEvent.click(button);

        expect(screen.getByText('Sign in with email')).toBeInTheDocument();
        expect(screen.getByText('Sign in with Google')).toBeInTheDocument();

        button = screen.getByText('Home');
        userEvent.click(button);

        expect(screen.getByText('Show all')).toBeInTheDocument();
        expect(screen.getByText('Health')).toBeInTheDocument();
    });
});

describe('barsecion', () => {
    test('filter works properly', () => {
        render(<App />);
        screen.debug();
        let button = screen.getByRole('button');
        userEvent.click(button);

        expect(screen.getByText('Guitar')).toBeInTheDocument();
        expect(screen.getByText('Running')).toBeInTheDocument();
        button = screen.getByText('Health');
        userEvent.click(button);
        expect(screen.getByText('Running')).toBeInTheDocument();
        expect(screen.getByText('Guitar')).not.toBeInTheDocument();
        expect(screen.getByText('Python')).not.toBeInTheDocument();
        button = screen.getByText('Career');
        userEvent.click(button);
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('Running')).not.toBeInTheDocument();
    });
    test('search works properly', () => {
        render(<App />);
        screen.debug();
        let button = screen.getByRole('button');
        userEvent.click(button);
    });
});
*/
