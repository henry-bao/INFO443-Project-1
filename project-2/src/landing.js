import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export function LandingPage() {
    let history = useHistory();

    function changePage() {
        history.push('/main');
    }
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div className="landing">
            <main>
                <h1>Goal Husky!</h1>

                <span onClick={changePage}>
                    <NavLink
                        className="splashButton"
                        to="/main"
                        style={{ color: 'white', textDecoration: 'none' }}
                    >
                        {isMobile
                            ? 'Click here to start!'
                            : 'Find like-minded people to complete your goals with!'}
                    </NavLink>
                </span>
            </main>
        </div>
    );
}
