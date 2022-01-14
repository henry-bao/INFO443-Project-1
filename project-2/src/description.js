import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';
import { capitalize } from './utils';
import { Join } from './Join';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function DescriptionPage(props) {
    const [cards, setCards] = useState([]);
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
    let descriptionId = useParams().id;
    const [redirectTo, setRedirectTo] = useState(descriptionId);
    let descriptionData = _.find(cards, { key: descriptionId });
    let descriptionIndex = _.indexOf(cards, descriptionData);
    const notify = () => {
        toast.error('You have reach the end!');
    };

    //spinner
    if (descriptionData === undefined) {
        return (
            <div className="text-center">
                <i className="fas fa-fan spinner animate__animated animate__rotateOut animate__slow animate__infinite infinite"></i>
            </div>
        );
    }
    const findNext = () => {
        let nextIndex = descriptionIndex + 1;
        if (nextIndex < cards.length) {
            let nextId = cards[nextIndex].key;
            setRedirectTo(nextId);
        } else {
            notify();
        }
    };
    const findPrevious = () => {
        let previousIndex = descriptionIndex - 1;
        if (previousIndex >= 0) {
            let nextId = cards[previousIndex].key;
            setRedirectTo(nextId);
        } else {
            notify();
        }
    };

    if (redirectTo !== descriptionId) {
        let url = '/description/' + redirectTo;
        return <Redirect to={url} />;
    }

    let distance = descriptionData.date - Date.now();

    return (
        <div className="descriptionSection">
            <div className="descriptionBox">
                <div className="row">
                    <img
                        className="animate__animated animate__backInLeft animate__slow"
                        src={descriptionData.img}
                        alt={descriptionData.title}
                    />
                    <div className="animate__animated animate__backInRight animate__slower descriptionContent">
                        <span className="btn btn-success disabled">
                            {capitalize(descriptionData.cate)}
                        </span>
                        <h2 className="title">{capitalize(descriptionData.title)}</h2>
                        <p>{capitalize(descriptionData.description)}</p>
                    </div>
                    <div className="animate__animated animate__fadeIn animate__slow icons row">
                        <i className="fas fa-chevron-circle-left" onClick={findPrevious}></i>
                        <i className="fas fa-chevron-circle-right" onClick={findNext}></i>
                        <ToastContainer className="alertBox"/>
                    </div>
                </div>
            </div>
            <Join distance={distance} data={descriptionData} currentUser={props.currentUser} />
        </div>
    );
}
