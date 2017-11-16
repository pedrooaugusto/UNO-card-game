import React from 'react';

const QuitButton = (props) => {
	return (
		<div className={"col s12 l3 hide-on-med-and-"+props.upOrDown}>
			<div className="hall__room__buttons">
				<div className="hall__room__buttons__button" onClick={props.quit}>Sair</div>
			</div>
		</div>		
	);
}
const InputMessage = ({sendMessage}) => {
	return (
		<div className="col s12 l6">
			<div className="hall__room__inputMessage">
				<input type="text" className="inputText" onKeyUp = {sendMessage} autoFocus/>
			</div>
		</div>
	);
}
const PlayersDiff = ({diff}) => {
	return (
		<div className="col s12 l3">
			<div className="hall__room__playersDiff">
				<span className="white-text">Faltam {diff} jogadores para começar o jogo.</span>
			</div>
		</div>
	);
}

const BelowMessageList = (props) => {
	return(
		<div>
			<QuitButton 
				upOrDown="down"
				quit = {props.quit} />
			<InputMessage {...props}/>
			<PlayersDiff diff = {props.diff}/>
			<QuitButton 
				upOrDown="up"
				quit = {props.quit} />
		</div>
	);
}
export default BelowMessageList;