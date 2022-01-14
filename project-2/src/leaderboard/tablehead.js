import React from 'react';

export default function TableHead(props) {
    return (
        <thead>
            <tr>
                <th>#</th>
                <th>Goal</th>
                {!props.isMobile && <th>Description</th>}
                <th
                    className="leaderboardTag"
                    onClick={() => {
                        props.setCardOrder(!props.cardOrder);
                    }}
                >
                    People {props.cardOrder ? '▼' : '▲'}
                </th>
            </tr>
        </thead>
    );
}
