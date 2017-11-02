import React from 'react';
import './styles.css';

class Hall extends React.Component{

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
export default Hall;