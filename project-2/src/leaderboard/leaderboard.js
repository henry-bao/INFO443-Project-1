import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import TableHead from './tablehead';
import TableBody from './tablebody';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const LeaderBoardContainer = styled.div`
    padding: 2em;
`;

export default function LeaderBoard(props) {
    const [cardOrder, setCardOrder] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return (
        <LeaderBoardContainer>
            <Table striped bordered condensed hover className="leaderboardBackground">
                <TableHead isMobile={isMobile} setCardOrder={setCardOrder} cardOrder={cardOrder} />
                <TableBody isMobile={isMobile} cards={props.cards} cardOrder={cardOrder} />
            </Table>
        </LeaderBoardContainer>
    );
}
