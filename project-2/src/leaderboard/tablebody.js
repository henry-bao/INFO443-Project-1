import React from 'react';

export default function TableBody(props) {
    let cardsToRender = props.cards.sort((card1, card2) => {
        return props.cardOrder ? card2.people - card1.people : card1.people - card2.people;
    });
    return (
        <>
            <tbody>
                {cardsToRender.map((card, index) => {
                    return (
                        <tr key={card.key}>
                            <td>{props.cardOrder ? index + 1 : cardsToRender.length - index}</td>
                            <td>
                                {card.title}
                                <br />
                                <br />
                                {<img src={card.img} className="leaderboardImg" alt={card.title} />}
                            </td>
                            {!props.isMobile && <td>{card.description}</td>}
                            <td>{card.people}</td>
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
}
