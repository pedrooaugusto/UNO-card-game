import React from 'react';
import PropTypes from 'prop-types';

const PlayersList = ({room}) => {
    const playersLeft = room.capacity - room.players.length;
    const players = room.players.map((item, index) => {
        return (<li key = {index}>{item.name || item}</li>);
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
                        {room.players.length}/{room.capacity}
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