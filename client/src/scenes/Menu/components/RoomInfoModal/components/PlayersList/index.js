import React from 'react';
import PropTypes from 'prop-types';

const PlayersList = ({room}) => {
    const playersLeft = room.get('capacity') - room.get('players').size;
    const players = room.get("players").map((item, index) => {
        return (<li key = {index}>{item.get("name") || item}</li>);
    });
    const text = playersLeft === 0 ? 
        "Esta sala esta cheia." : 
        "Faltam "+playersLeft+" jogadores para começar o jogo.";

    return (
    	<div>
			<label className="info-label">Pessoas na sala:</label>
        	<ul className="modal-list-peoples">
                {players}
            </ul>
        	<div>
            	<label className="info-label">
                    {text}
                 	<span className="right">
                        {room.get('players').size}/{room.get('capacity')}
                    </span>
                </label>
            </div>
        </div>
    );
}

PlayersList.propTypes = {
    room: PropTypes.object.isRequired,
}
export default PlayersList;