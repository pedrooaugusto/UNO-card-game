import React from 'react';
import UnoPackMap from '../../map-uno-pack-images';

const UsedCards = (props) => {
	return (
		<div className = "game__throw__cards">
			{props.usedCards.map((card, index) => {
				const x = UnoPackMap.get(card.get("name")).x;
				const y = UnoPackMap.get(card.get("name")).y;
				const classes = card.get("from") === props.socketID ? "card_-wrapper a" : "card_-wrapper e";
				const css = {
					transform : `rotate(${card.get('rotate')}deg)`,
					backgroundPosition : `${x}px ${y}px`
				}
				return (
					<div 
						className = {classes}
						key = {index}>
							<div
								className = "card_" 
								style = {css}
								data-name = {card.get('name')}>
							</div>
					</div>		
				)
			})}
		</div>
	);
}

export default UsedCards;