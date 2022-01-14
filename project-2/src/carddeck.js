import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export function CardDeck(props) {
    //spinner
    if (props.cards.length === 0) {
        return (
            <div className="text-center">
                <i className="fas fa-fan spinner animate__animated animate__rotateOut animate__slow animate__infinite infinite"></i>
            </div>
        );
    }

    let cardList = props.cards.map((element) => {
        let card = <Card data={element} key={element.key} />;
        return card;
    });

    return <div className="card-deck">{cardList}</div>;
}

function Card(props) {
    let database = props.data;
    const [redirectTo, setRedirectTo] = useState();
    const clickAnimation = (event) => {
        event.preventDefault();
        event.target.classList.add('animate__animated', 'animate__headShake', 'animate__slow');
        setTimeout(function () {
            setRedirectTo(database.key);
        }, 1200);
    };

    let shortDescription = [];
    let descriptionWords = database.description.split(' ');
    shortDescription.push(descriptionWords[0]);
    shortDescription.push(' ');
    shortDescription.push(descriptionWords[1]);
    shortDescription.push(' ');
    shortDescription.push(descriptionWords[2]);
    shortDescription.push(' ...');

    if (redirectTo !== undefined) {
        let url = '/description/' + redirectTo;
        return <Redirect push to={url} />;
    }

    return (
        <div className="card mb-4" onClick={clickAnimation}>
            <img className="card-img-top" src={database.img} alt={database.title} />
            <div className="card-body">
                <div className="row">
                    <h2 className="card-title col-8">{database.title}</h2>
                    <h3 className="card-title col-4 btn btn-success">{database.cate}</h3>
                </div>
                <div className="row">
                    <p className="card-text col-8">{shortDescription}</p>
                    <p className="card-text col-4 btn btn-warning">{database.people}</p>
                </div>
            </div>
        </div>
    );
}
