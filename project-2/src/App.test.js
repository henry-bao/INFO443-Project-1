import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
// import App from './App';
import LandingPage from './landing';

// import BarSection from './barsection';

// describe('The app', () => {
//     test('Renders without crashing', () => {
//         render(<App />);
//     });
// });

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

// describe('sign in', () => {
//     test('sign in page shows up correctly', () => {
//         render(<App />);
//         screen.debug();
//         let button = screen.getByRole('button');
//         userEvent.click(button);
//         button = screen.getByText('Sign in');
//         userEvent.click(button);

//         expect(screen.getByText('Sign in with email')).toBeInTheDocument();
//         expect(screen.getByText('Sign in with Google')).toBeInTheDocument();

//         button = screen.getByText('Home');
//         userEvent.click(button);

//         expect(screen.getByText('Show all')).toBeInTheDocument();
//         expect(screen.getByText('Health')).toBeInTheDocument();
//     });
// });

// describe('barsection', () => {
//     test('barsection renders without error', () => {
//         render(
//             <BrowserRouter>
//                 <BarSection />
//             </BrowserRouter>
//         );
//     });

//     // test('filter works properly', () => {
//     //     render(
//     //         <BrowserRouter>
//     //             <BarSection />
//     //         </BrowserRouter>
//     //     );
//     //     expect(screen.getByText('Guitar')).toBeInTheDocument();
//     //     expect(screen.getByText('Running')).toBeInTheDocument();
//     //     let button = screen.getByText('Health');
//     //     userEvent.click(button);
//     //     expect(screen.getByText('Running')).toBeInTheDocument();
//     //     expect(screen.getByText('Guitar')).not.toBeInTheDocument();
//     //     expect(screen.getByText('Python')).not.toBeInTheDocument();
//     //     button = screen.getByText('Career');
//     //     userEvent.click(button);
//     //     expect(screen.getByText('Python')).toBeInTheDocument();
//     //     // expect(screen.getByText('Running')).not.toBeInTheDocument();
//     // });
//     // test('search works properly', () => {
//     //     render(
//     //         <BrowserRouter>
//     //             <BarSection />
//     //         </BrowserRouter>
//     //     );
//     //     screen.debug();
//     //     let button = screen.getByRole('button');
//     //     userEvent.click(button);
//     // });
// });
