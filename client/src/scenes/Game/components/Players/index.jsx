import React from 'react';

const Players = (props) => {
	return (
		<div className = "game__section room__players">
			{props.players.map((player, index) => {
				const classes = props.currentPlayerIndex === index ? "player active" : "player";
				const isPrevious = props.previousPlayer.get("index") === index;
				const previousValue = props.previousPlayer.get("value");
				const positive = previousValue > 0 ? "player__stats positive" : "player__stats negative";
				return (
					<div key = {index}>
						<div className = {classes}>
							{player.get("name").substr(0, 1).toLocaleUpperCase()}
						</div>
						{isPrevious && (<div className = {positive}>{previousValue}</div>)}
					</div>
				);
			})}
		</div>
	);
}

export default Players;