import React from 'react';
import './styles.css';
import Title from './components/Title';
import PlayersList from './components/PlayersList';
import Messages from './components/Messages';
import BelowMessageList from './components/BelowMessageList';
import PlayerInfoModal from './components/PlayerInfoModal';

class Hall extends React.Component{
	componentWillMount() {
		this.props.hall.checkCredentials();
	}
	quit = () => {
		const answer = window.confirm("Deseja realmente sair da sala? (theres no coming back)");
		if(answer)
			this.props.history.push("/");
	}
	handleSendMessage = (event) => {
		if(event.keyCode === 13 && event.target.value !== ""){
			console.log(this.refs);
			const message = {
				from: {id: this.props.socketID, name: ''},
				text: event.target.value,
				room: this.props.hall.room.name
			};
			this.props.hall.sendMessage(message);
			event.target.value = "";
		}
	}
	render(){
		if(this.props.hall.room === undefined)
			return (<center><h1>LOADING....</h1></center>);
		return(
			<div className="scene--hall">
				<div className="container">
					<div className="row">
						<div className="col s12 l12">
							<Title name = {this.props.hall.room.name}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12 l12">
							<PlayersList
								socketID = {this.props.socketID}
								capacity = {this.props.hall.room.capacity}
								players = {this.props.hall.players}
								onModalOpen = {this.props.playerInfo.onModalOpen}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12 l6 offset-l3">
							<Messages
								socketID = {this.props.socketID}
								messages = {this.props.hall.messages}/>
						</div>
					</div>
					<div className="row">
						<BelowMessageList
							sendMessage = {this.handleSendMessage}
							diff = {this.props.hall.room.capacity - this.props.hall.players.length}
							quit = {this.quit}/>
					</div>
				</div>
				<PlayerInfoModal
					roomAdmin = {this.props.hall.room.admin}
					isOpen = {this.props.playerInfo.isOpen}
					loadStatus = {this.props.playerInfo.loadStatus}
					message = {this.props.playerInfo.message}
					player = {this.props.playerInfo.player}
					freeSpot = {this.props.playerInfo.freeSpot} 
					onCloseModal={this.props.playerInfo.onModalClose}
					socketID = {this.props.socketID}/>
			</div>
		);
	}
}

export default Hall;









/*class Hall extends React.Component{

	componentWillMount() {
		this.props.hall.checkCredentials();
	}
	handleClick = () => {
		const message = {
			from: {id: this.props.socketID, name: ''},
			text: this.input.value,
			room: this.props.hall.room.name,
			time: new Date().toLocaleString("bali")
		};
		this.props.hall.sendMessage(message);
		this.input.value = "";
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.props.hall.room)
			this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
	}
	createMessage(data, key){
		return(
			<div className={this.props.socketID === data.from.id ? "message me" : "message"} key = {key}>
				<div className="message__header">
					<div className="message__header__from">{data.from.name}</div>
					<div className="message__header__time">{data.time}</div>
				</div>
				<div className="message__text">
					{data.text}
				</div>
			</div>
		);		
	}
	cratePlayers()
	{
		const players = [];
		for(let i = 0; i < this.props.hall.room.capacity; i++)
		{
			if(i < this.props.hall.players.length)
			{
				if(this.props.hall.players[i].id === this.props.socketID)
				{
					players.push(
						<div key = {i} className="player blue me tooltipped" 
							data-position="bottom" data-delay="50" title={this.props.hall.players[i].name}>
							{this.props.hall.players[i].name.substring(0, 1)}
						</div>
					);			
				}
				else
				{
					players.push(
						<div key = {i} className="player blue tooltipped"
							data-position="bottom" data-delay="50" title={this.props.hall.players[i].name}>
							{this.props.hall.players[i].name.substring(0, 1)}
						</div>
					);
				}
			}
			else
			{
				players.push(<div key = {i} className="player blue" title="Waitin for player...">?</div>);
			}
		}
		return players;
	}
	render(){
		if(this.props.hall.room === undefined)
			return (<center><h1>LOADING....</h1></center>);
		return(
			<div className="scene--hall">
				<div className="container">
					<div className="row">
						<div className="col s12 l12" style={{"textAlign": "center"}}>
							<h3>@{this.props.hall.room.name}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col s12 l12" style={{"textAlign": "center"}}>
							<div className="players">
								{this.cratePlayers(this.props.hall.players)}
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="row">
						<div className="col s12 l8 offset-l2">
							<div className="messages" ref={(messagesContainer => this.messagesContainer = messagesContainer)}>
								{this.props.hall.messages.map((a, index) => this.createMessage(a, index))}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col s12 l6 offset-l2">
							<div className="inputText">
								<textarea height="200" rows="5" ref={(input => this.input = input)}>
									
								</textarea>
							</div>
						</div>
						<div className="col s1 l1">
							<div className = "inputSend">
								<button 
									className="btn waves-effect waves-light blue"
									type="submit"
									name="action"
									onClick={this.handleClick}>
									Send <i className="material-icons right">send</i>
								</button>
							</div>
						</div>
					</div>
				</div>
          		<div className="foot">
            		Created By Pedro Augusto
          		</div>
			</div>
		);
	}
}
export default Hall;*/