import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { CardDeck } from './carddeck';
import { BarSection } from './barsection';
import { DescriptionPage } from './description';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './navbar/navbar';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AddGoalForm } from '../../goalform';
import Footer from './footer';
import LandingPage from './landing';
import { decode, encode } from 'base-64';
import LeaderBoard from './leaderboard/leaderboard';
import { useMediaQuery } from 'react-responsive';

if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

// firebase sign in ui
const uiConfig = {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requiredDisplayName: true,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
    signInFlow: 'popup',
    signInSuccessUrl: '/main',
};

export default function App() {
    const [cards, setCards] = useState([]);
    const [cardsData, setCardsData] = useState([]);
    useEffect(() => {
        const cardsRef = firebase.database().ref('Goals');
        cardsRef.on('value', (snapshot) => {
            const theCardsObj = snapshot.val();
            let objectKeyArray = Object.keys(theCardsObj);
            let cardsArray = objectKeyArray.map((key) => {
                let singleCardObj = theCardsObj[key];
                singleCardObj.key = key;
                return singleCardObj;
            });
            setCardsData(cardsArray);
            setCards(cardsArray);
        });
    }, []);

    const [user, setUser] = useState(undefined);

    // auth state event listener

    useEffect(() => {
        const cardsRef = firebase.database().ref('Goals');
        cardsRef.on('value', (snapshot) => {
            const theCardsObj = snapshot.val();
            let objectKeyArray = Object.keys(theCardsObj);
            let cardsArray = objectKeyArray.map((key) => {
                let singleCardObj = theCardsObj[key];
                singleCardObj.key = key;
                return singleCardObj;
            });
            setCards(cardsArray);
        });
    }, []);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
        });
    });

    function handleFilter(input) {
        let category = input.target.id;
        let cardsCopy = cardsData;
        if (category !== 'ShowAll') {
            cardsCopy = cardsData.filter(
                (card) => card.cate.toLowerCase() === category.toLowerCase()
            );
        }
        setCards(cardsCopy);
    }
    function handleSearch(input) {
        let searchWord = input.target.value;
        let cardsCopy = cardsData.filter((card) =>
            card.title.toLowerCase().includes(searchWord.toLowerCase())
        );
        setCards(cardsCopy);
    }

    let loginPage = (
        <StyledFirebaseAuth
            className="loginPage"
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );

    const urlPath = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div>
            <header>
                {urlPath.pathname !== '/' && <NavBar signInStatus={user} isMobile={isMobile} />}
            </header>
            <main>
                <Switch>
                    <Route exact path="/">
                        <LandingPage isMobile={isMobile} />
                    </Route>
                    <Route path="/main">
                        <BarSection
                            data={cards}
                            handleFilter={handleFilter}
                            handleSearch={handleSearch}
                        />
                        <div className="container">
                            <CardDeck cards={cards} />
                        </div>
                        <AddGoalForm />
                    </Route>
                    <Route path="/description/:id">
                        <div className="container">
                            <DescriptionPage currentUser={user} />
                        </div>
                        <AddGoalForm />
                    </Route>
                    <Route path="/signin">{loginPage}</Route>
                    <Route path="/ranking">
                        <LeaderBoard cards={cardsData} />
                    </Route>
                    <Route path="/">
                        <Redirect to="/main" />
                    </Route>
                </Switch>
            </main>
            {urlPath.pathname !== '/' && <Footer />}
        </div>
    );
}
