import React from 'react';
import UnoPackMap from '../../map-uno-pack-images';

const Card = (props) => {
	let time = -1; 
	const sendCard = () => {
		if(props.myIndex !== props.currentPlayerIndex)
			return window.alert("Please, wait yout turn");
		const rotate = ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6));
		const obj = {
			card: [{
				id: props.key_,
				name: props.name,
				from: props.currentPlayerIndex,
				rotate
			}],
			ctx: {
				currentPlayerIndex: props.currentPlayerIndex,
				capacity: props.capacity,
				direction: props.direction
			}
		}
		props.sendCard(obj);		
	}
	const clickEvent = (event) => {
		if(props.cursor === "wait")
			return false;
		if(time === -1)
			time = setTimeout(sendCard, 200);
		else if(time !== -1)
		{
			clearTimeout(time);
			props.selectCard(props.key_, !props.isSelected);
			time = -1;
		}
	}
	const x = UnoPackMap.get(props.name).x;
	const y = UnoPackMap.get(props.name).y;
	const css = {
		backgroundPosition : `${x}px ${y}px`,
		transform: `scale(${props.isSelected ? 0.75 : 0.9})`,
		cursor: props.cursor
	}
	if(props.used)
		return null;
	return (
		<div 
			onClick = {clickEvent}
			className = "card_" 
			style = {css}
			data-selected = {props.isSelected}
			data-name = {props.name}>
		</div>			
	);
}
const YourCards = (props) => {
	return (
		<div className = "game__yourCards">
			{props.yourCards.map((card, index) => {
				return (
					<Card 
						name = {card.get('name')}
						key_ = {card.get('id')}
						key = {index}
						isSelected = {card.get('isSelected')}
						sendCard = {props.sendCard}
						selectCard = {props.selectCard}
						currentPlayerIndex = {props.currentPlayerIndex}
						capacity = {props.capacity}
						direction = {props.direction}
						used = {card.get("used")}
						myIndex = {props.myIndex}/>
				);
			})}
		</div>
	);
};

export default YourCards;