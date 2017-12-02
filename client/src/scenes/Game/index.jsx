import React from 'react';
// import ReactModal from 'react-modal';
import Players from './components/Players/';
import UsedCards from './components/UsedCards/';
import YourCards from './components/YourCards/';
import Feedback from './components/Feedback/';
import './styles.css';


const yourCards = [
	{
		name: 'red-turn',
		isSelected: false,
		used: false
	},
	{
		name: 'blue-nine',
		isSelected: false,
		used: false
	},
	{
		name: 'yellow-zero',
		isSelected: false,
		used: false
	},
	{
		name: 'red-buy-two',
		isSelected: false,
		used: false
	},
	{
		name: 'change-color',
		isSelected: false,
		used: false
	},
	{
		name: 'red-turn',
		isSelected: false,
		used: false
	},
	{
		name: 'blue-block',
		isSelected: false,
		used: false
	},
	{
		name: 'green-six',
		isSelected: false,
		used: false
	},
	{
		name: 'yellow-zero',
		isSelected: false,
		used: false
	},
	{
		name: 'buy-four',
		isSelected: false,
		used: false
	}
];
const players = [
	{
		name: "Unicarioca",
		active: true
	},
	{
		name: "Myself",
		active: false
	},
	{
		name: "The Doctor",
		active: false
	},
	{
		name: "Diego Ferreira",
		active: false
	}
];

class Game extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			countDown: 30, 
			yourCards, 
			usedCards: [],
			players,
			mopen: false
		};
		this.timeout = 0;
	}
	componentDidMount() {
		document.title = "Uno - Gaming - "+this.props.history.location.pathname.substr(6);
		this.props.checkCredentials();
	}
	sendAll = () => {
		const usedCard = this.props.state.get("yourCards").filter(a => a.get("isSelected"));
		this.props.sendCard(usedCard);
	}
	// sendAll = () => {
	// 	const usedCard = this.state.yourCards.filter(a => true);
	// 	usedCard.map((v,i) => {
	// 		if(v.isSelected) this.sendCard(i, v.name);
	// 	});
	// }
	// sendCard = (index, name) => {
	// 	this.setState((a, b) => {
	// 		a.yourCards[index].used = true;
	// 		a.yourCards[index].isSelected = false;
	// 		return {
	// 			yourCards: a.yourCards
	// 		};
	// 	});
	// 	const rotate = ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6));
	// 	this.setState((a, b) => {
	// 		a.usedCards.push({
	// 			name,
	// 			rotate
	// 		});
	// 		return {
	// 			usedCards: a.usedCards
	// 		};
	// 	});
	// }
	// selectCard = (index, un) => {
	// 	this.setState((a, b) => {
	// 		a.yourCards[index].isSelected = (un ? false : true);
	// 		return {
	// 			yourCards: a.yourCards
	// 		};
	// 	});
	// }
	thick(){
		this.timeout = setInterval(() => this.setState(a => ({countDown: a.countDown-1})), 1000);
	}
	render(){
		if(this.props.state.get("room") === undefined)
			return <h1><center>Loading...</center></h1>;
		const cursor = this.props.state.get("froozen") ? "wait" : "pointer";
		const capacity = this.props.state.getIn(["room", "capacity"]);
		const direction = this.props.state.get("direction");
		const currentPlayerIndex = this.props.state.get('currentPlayer');
		
		return (
			<div className = "scene--game">
				<div className = "container__">
					<div className = "game__wrapper">
						<div className = "game__section room__name">
							<div className ="name">
								{this.props.state.getIn(["room", "name"])}
							</div>
						</div>
						<Players 
							players = {this.props.state.getIn(["room", "players"])}
							currentPlayerIndex = {currentPlayerIndex}
							previousPlayer = {this.props.state.get("previousPlayer")}/>
						<div className = "game__section room__message">							<Feedback 
								players = {this.props.state.getIn(["room", "players"])}
								myIndex = {this.props.state.get("myIndex")}
								currentPlayerIndex = {currentPlayerIndex}
								text = {this.props.state.get("feedback")}/>
						</div>
						<div className = "game__section room__cards">
							<UsedCards 
								usedCards = {this.props.state.get("usedCards")}
								socketID = {this.props.socketID}/>
						</div>
						<div className = "game__section room__actions">
							<div className = "game__menu">
								<div className = "button chat" onClick = {this.props.openModal}>Chat</div>
								<div className = "button">Buy</div>
								<div className = "button">Help</div>
								<div className = "button uno">UNO!</div>
								{this.props.state.get("yourCards").filter(a => a.get("isSelected")).size > 0 &&
									(<div className = "button sendAll" onClick = {this.sendAll}>Send All</div>)}
							</div>
						</div>
						<div className = "game__section room__yourCards">
							<YourCards 
								yourCards = {this.props.state.get("yourCards")}
								sendCard = {this.props.sendCard}
								selectCard = {this.props.selectCard}
								cursor = {cursor}
								currentPlayerIndex = {currentPlayerIndex}
								capacity = {capacity}
								direction = {direction}
								myIndex = {this.props.state.get("myIndex")}/>
						</div>
					</div>
				</div>
				{/*<ReactModal
					className = "scene--game__room__chat"
			    	isOpen={false}
			        style={modalStyle}
			        onRequestClose = {this.closeModal}
			        shouldCloseOnOverlayClick={true}
			        contentLabel="Chat">
			        	<div className = "chat__room">
			        		<div className = "header">
			        			<div className = "text">Nerd For Speed</div>
			        			<div className = "icon" onClick = {this.closeModal}>x</div>
			        		</div>
			        		<div className = "messages">
			        			<div className = "message-wrapper">
			        				<div className = "message">
				        				<div className = "from">~Pedro</div>
				        				<div className = "text">Hello Jen!</div>
				        			</div>	
			        			</div>
			   			        <div className = "message-wrapper">
			   			        	<div className = "message myself">
				        				<div className = "from">~Pedro</div>
				        				<div className = "text">Hello Jen!</div>
			        				</div>
			        			</div>
			        			<div className = "message-wrapper">
			        				<div className = "message">
				        				<div className = "from">~Pedro</div>
				        				<div className = "text">Hello Jen!</div>
				        			</div>	
			        			</div>
			   			        <div className = "message-wrapper">
			   			        	<div className = "message myself">
				        				<div className = "from">~Pedro</div>
				        				<div className = "text">Hello Jen!</div>
			        				</div>
			        			</div>
			        			<div className = "message-wrapper">
			        				<div className = "message">
				        				<div className = "from">~Pedro</div>
				        				<div className = "text">Hello Jen!</div>
				        			</div>	
			        			</div>
			   			        <div className = "message-wrapper">
			   			        	<div className = "message myself">
				        				<div className = "from">~Pedro</div>
				        				<div className = "text">Hello Jen!</div>
			        				</div>
			        			</div>
			        		</div>
			        		<div className = "input__">
			        			<input type = "text" name = "msg" autoFocus="true" />
			        		</div>
			        	</div>
			    </ReactModal>*/}
			</div>
		);
	}
}
export default Game;