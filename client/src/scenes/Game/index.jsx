import React from 'react';
import Players from './components/Players/';
import UsedCards from './components/UsedCards/';
import YourCards from './components/YourCards/';
import Feedback from './components/Feedback/';
import ChooseColor from './components/ChooseColor/';
import UnoModal from './components/UnoModal/';
import EndGameModal from './components/EndGameModal/';
import StandardModal from './components/StandardModal/';
import RulesModal from './components/RulesModal/';
import ChatModal from './components/ChatModal/';

import './styles.css';

class Game extends React.Component{
	componentDidMount() {
		document.title = "Uno - Gaming - "+this.props.history.location.pathname.substr(6);
		this.props.checkCredentials();
	}
	checkTurn = (b = false) => 
	{
		if(this.props.state.get("froozen"))
			return {
				ok: false, 
				text: "Processando o último movimento, por favor espere."
			};

		if(this.props.state.get("myIndex") !== this.props.state.get('currentPlayer'))
			return {
				ok: false,
				text: "Não é a sua vez, cara!"
			};

		if(b === false && this.props.state.get("myIndex") === this.props.state.getIn(['needToBuy', 'who']) && 
			this.props.state.getIn(['needToBuy', 'howMany']) > 0)
			return {
				ok: false,
				text: "Você precisa comprar "+this.props.state.getIn(['needToBuy', 'howMany'])+" cartas!"
			};

		return {
			ok: true, 
			text: "ok"
		};
	}
	checkCard = (card = null, all = false) => 
	{
		if(all)
		{
			const cards = this.props.state.get("selectedCards");
			let ok = true;
			let last = this.props.state.get("usedCards").get(this.props.state.get("usedCards").size - 1);
			for(let i = 0; i < cards.size; i++)
			{
				if(!this.checkCard_(cards.get(i), last, i))
				{
					ok = false;
					break;
				}
				else
				{
					last = cards.get(i);
				}
			}
			if(!ok)
			{
				// window.alert("Sua combinação de cartas não é válida!");
				this.props.openStandardModal("Sua combinação de cartas não é válida!");
				return false;
			}
			else
			{ 
				return  true;
			}
		}
		else
		{
			const last = this.props.state.get("usedCards").get(this.props.state.get("usedCards").size - 1);
			if(!this.checkCard_(card, last, 0))
			{
				// window.alert("Sua combinação de cartas não é válida!");
				this.props.openStandardModal("Esta combinação de cartas não é válida!");
				return false;
			}
			else
			{
				return true;
			}
		}
	}
	checkCard_ = (current, last, nc = 0) => 
	{
		const n1 = current.name || current.get("name");
		const arrNameLast = last.get("name").split("-");
		const arrNameCurrent = n1.split("-");
		if(nc > 0 && arrNameCurrent[1] === arrNameLast[1])
			return true;
		else if(nc > 0)
			return false;
		if(n1 === "buy-four" || n1 === "change-color")//coringa sem restrição
			return true;
		if((last.get("name") === "change-color" || last.get("name") === "buy-four")//se o último for coringa match na cor
			&& last.get("color") === arrNameCurrent[0])
			return true;
		else if(last.get("name") === "change-color" || last.get("name") === "buy-four")// se não deu match na cor nao vai dar em nada
			return false;
		if(arrNameCurrent[0] === arrNameLast[0])//cores iguais para cartas não coringa
			return true;
		if(arrNameCurrent[1] === arrNameLast[1])//ações iguais para cartas não coringa
			return true;
		return false;
	}
	sendAll = () => 
	{
		const {text, ok} = this.checkTurn();
		if(ok)
		{
			if(this.checkCard(null, true))
			{
				const card = this.props.state.get("selectedCards").map(a => ({
					id: a.get('id'),
					name: a.get('name'),
					from: this.props.state.get('currentPlayer'),
					rotate: ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6)),
					color: a.get("color")
				}));
				const ctx = {
					currentPlayerIndex: this.props.state.get('currentPlayer'),
					capacity: this.props.state.getIn(['room', 'capacity']),
					direction: this.props.state.get('direction')
				}
				this.props.sendCard({card, ctx});
			}
		}
		else
		{
			this.props.openStandardModal(text);
		}
	}
	buyCard = () => 
	{
		const {ok, text} = this.checkTurn(true);
		const ctx = {
			currentPlayerIndex: this.props.state.get('currentPlayer'),
			capacity: this.props.state.getIn(['room', 'capacity']),
			direction: this.props.state.get('direction'),
			needToBuy: this.props.state.getIn(['needToBuy', 'howMany']),
			forSaleCardsLength: this.props.state.get('unUsedCards').size,
			pass: false
		};
		const w = `Não existem cartas para comprar passando a vez...`;
		if(this.props.state.get('unUsedCards').size === 0)
			return this.props.buyCardsIsEmpty(w, ctx);
		if(ok)
			this.props.buyCard(ctx);
		else
			this.props.openStandardModal(text);
	}
	chooseColor = (a, b) => {
		this.props.onOpenChooseColor();
		if(typeof a !== "number")
			this.props.chooseColorSend(a);
		else
			this.props.chooseColorSelect(a, b);
	}
	render(){
		if(this.props.state.get("room") === undefined)
			return <h1><center>Loading! It will take 8 seconds or less!</center></h1>;
		const cursor = this.props.state.get("froozen") ? "wait" : "pointer";
		const capacity = this.props.state.getIn(["room", "capacity"]);
		const direction = this.props.state.get("direction");
		const currentPlayerIndex = this.props.state.get('currentPlayer');
		const ss__ = this.props.state.get("usedCards").size;
		const lastCard = ss__ > 0 ? this.props.state.get("usedCards").get(ss__ - 1) : undefined;
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
							previousPlayer = {this.props.state.get("previousPlayer")}
							playersCards = {this.props.state.get("playersCards")}/>
						<div className = "game__section room__message">
							<Feedback 
								players = {this.props.state.getIn(["room", "players"])}
								myIndex = {this.props.state.get("myIndex")}
								currentPlayerIndex = {currentPlayerIndex}
								text = {this.props.state.get("feedback")}
								howMany = {this.props.state.getIn(["needToBuy", "howMany"])}
								time = {this.props.state.get("cronometro")}
								color = {lastCard ? lastCard.get("color") : undefined}/>
						</div>
						<div className = "game__section room__cards">
							<UsedCards 
								usedCards = {this.props.state.get("usedCards")}
								socketID = {this.props.socketID}/>
						</div>
						<div className = "game__section room__actions">
							<div className = "game__menu">
								<div className = "button chat" onClick = {this.props.openChat}>Chat</div>
								<div className = "button" onClick = {this.buyCard}>Buy</div>
								<div className = "button" onClick = {this.props.openRulesModal}>Help</div>
								{this.props.state.get("selectedCards").size > 0 &&
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
								myIndex = {this.props.state.get("myIndex")}
								checkTurn = {this.checkTurn}
								chooseColor = {this.chooseColor}
								checkCard = {this.checkCard}
								openStandardModal = {this.props.openStandardModal}/>
						</div>
					</div>
				</div>
				<ChooseColor 
					isOpen = {this.props.state.getIn(['chooseColor', 'isOpen'])}
					onCloseChooseColor = {this.props.onCloseChooseColor}
					chooseColor = {this.props.state.get("chooseColor")}
					sendCard = {this.props.sendCard}
					selectCard = {this.props.selectCard}/>
				<UnoModal 
					isOpen = {this.props.state.getIn(['uno', 'isOpen'])}
					playerName = {this.props.state.getIn(['uno', 'who', 'name'])}
					onCloseUnoModal = {this.props.closeUnoing}/>
				<EndGameModal
					isOpen = {this.props.state.getIn(['endGame', 'isOpen'])}
					players = {this.props.state.getIn(['endGame', 'players'])}
					onCloseModal = {this.props.endGame}/>
				<StandardModal 
					isOpen = {this.props.state.getIn(['standardModal', 'isOpen'])}
					title = {"Information"}
					text = {this.props.state.getIn(['standardModal', 'text'])}
					onCloseModal = {this.props.closeStandardModal}/>
				<RulesModal 
					isOpen = {this.props.state.get('rulesModal')}
					onCloseModal = {this.props.closeRulesModal}/>
				<ChatModal
					isOpen = {this.props.state.getIn(['messagesModal', 'isOpen'])}
					messages = {this.props.state.getIn(['messagesModal', 'messages'])}
					roomName = {this.props.state.getIn(['room', 'name'])}
					onCloseModal = {this.props.closeChat}
					socketId = {this.props.socketID}
					sendMessage = {this.props.sendMessage}
					myName = {this.props.state.getIn(['room', 'players']).get(this.props.state.get('myIndex')).get('name')}/>
			</div>
		);
	}
}
export default Game;