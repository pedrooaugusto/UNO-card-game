import React from 'react';
import UnoPackMap from '../../map-uno-pack-images';


class Card 	extends React.Component{
	constructor(props){
		super(props);
		this.time = -1;
	}
	createObj(){
		const rotate = ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6));
		const obj = {
			card: [{
				id: this.props.key_,
				name: this.props.name,
				from: this.props.currentPlayerIndex,
				rotate
			}],
			ctx: {
				currentPlayerIndex: this.props.currentPlayerIndex,
				capacity: this.props.capacity,
				direction: this.props.direction
			}
		}
		return obj;
	}
	sendCard = () => {
		if(this.props.checkCard({name: this.props.name}, false, 0))
		{
			if(this.props.name === "change-color" || this.props.name === "buy-four")
				this.props.chooseColor(this.createObj());
			else
				this.props.sendCard(this.createObj());
		}
	}
	clickEvent = (event) => {
		const {ok, text} = this.props.checkTurn();
		if(!ok)
		{
			this.props.openStandardModal(text);
		}
		else if(this.time === -1)
		{
			this.time = setTimeout(this.sendCard, 200);
		}
		else if(this.time !== -1)
		{
			clearTimeout(this.time);
			this.time = -1;
			if((this.props.name === "buy-four" || 
				this.props.name === "change-color") && !this.props.isSelected)
				this.props.chooseColor(this.props.key_, !this.props.isSelected);
			else
				this.props.selectCard(this.props.key_, !this.props.isSelected);
		}
	}
	render(){
		if(this.props.used)
			return null;
		const x = UnoPackMap.get(this.props.name).x;
		const y = UnoPackMap.get(this.props.name).y;
		const css = {
			backgroundPosition : `${x}px ${y}px`,
			transform: `scale(${this.props.isSelected ? 0.75 : 0.9})`,
			cursor: this.props.cursor
		};
		return (
			<div 
				onClick = {this.clickEvent}
				className = {this.props.isNew ? "card_ ani" : "card_"} 
				style = {css}
				data-selected = {this.props.isSelected}
				data-name = {this.props.name}>
			</div>
		);
	}
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
						myIndex = {props.myIndex}
						checkTurn = {props.checkTurn}
						isNew = {card.get("isNew")}
						chooseColor = {props.chooseColor}
						checkCard = {props.checkCard}
						openStandardModal = {props.openStandardModal}/>
				);
			}).reverse()}
		</div>
	);
};

export default YourCards;