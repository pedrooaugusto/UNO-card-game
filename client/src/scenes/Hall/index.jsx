import React from 'react';
import './styles.css';
import Title from './components/Title';
import PlayersList from './components/PlayersList';
import Messages from './components/Messages';
import BelowMessageList from './components/BelowMessageList';
import PlayerInfoModal from './components/PlayerInfoModal';

class Hall extends React.Component {
	componentWillMount() {
		this.props.checkCredentials();
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.state.get('room'))
			document.title = "Uno - Hall - " + nextProps.state.getIn(['room', 'name']);
	}
	quit = () => {
		const answer = window.confirm("Deseja realmente sair da sala? (theres no coming back)");
		if(answer){
			this.props.exit();
		}
	}
	handleSendMessage = (event) => {
		if(event.keyCode === 13 && event.target.value !== ""){
			const message = {
				from: {id: this.props.socketID, name: ''},
				text: event.target.value,
				room: this.props.state.getIn(['room', 'name'])
			};
			this.props.sendMessage(message);
			event.target.value = "";
		}
	}
	render(){
		if(this.props.state.get("room") === undefined)
			return (<center><h1>LOADING....</h1></center>);
		return(
			<div className="scene--hall">
				<div className="container">
					<div className="row">
						<div className="col s12 l12">
							<Title name = {this.props.state.getIn(['room', 'name'])}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12 l12">
							<PlayersList
								socketID = {this.props.socketID}
								capacity = {this.props.state.getIn(['room', 'capacity'])}
								players = {this.props.state.getIn(['room', 'players'])}
								onModalOpen = {this.props.onModalOpen}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12 l6 offset-l3">
							<Messages
								socketID = {this.props.socketID}
								messages = {this.props.state.get("messages")}/>
						</div>
					</div>
					<div className="row">
						<BelowMessageList
							sendMessage = {this.handleSendMessage}
							diff = {this.props.state.getIn(['room', 'capacity']) - this.props.state.getIn(['room', 'players']).size}
							quit = {this.quit}/>
					</div>
				</div>
				<PlayerInfoModal
					roomAdmin = {this.props.state.getIn(['room', 'admin', 'socketId'])}
					isOpen = {this.props.state.getIn(['playerInfo', 'isOpen'])}
					player = {this.props.state.getIn(['playerInfo', 'player'])}
					freeSpot = {this.props.state.getIn(['playerInfo', 'freeSpot'])} 
					onCloseModal={this.props.onModalClose}
					socketID = {this.props.socketID}
					addBot = {this.props.addBot}
					removeBot = {this.props.removeBot}/>
			</div>
		);
	}
}

export default Hall;