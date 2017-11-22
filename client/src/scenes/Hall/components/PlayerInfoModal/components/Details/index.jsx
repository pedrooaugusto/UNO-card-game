import React from 'react';

const CloseButton = (props) => {
	return (
  		<button
  			className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
  			onClick={props.onCloseModal}>
  			Fechar
  		</button>
	);
}
const TransformBotButton = (props) => {
	const action = () => props.unMake ? props.removeBot(props.player.get('name')) : props.addBot()
	return (
		<button 
			className="playerDeatails__buttons__button playerDeatails__buttons__button--toBot"
			onClick={action}>
				{props.unMake ? "Remover Bot" : "Transformar em bot"}
		</button>
	);
}
const Buttons = (props) => {
	return (
		<div className="playerDeatails__footer--wrapper">
			<div className="playerDeatails__footer">
				<div className="divider"></div>
				<div className="playerDeatails__buttons">
					{props.children}
				</div>
			</div>
		</div>
	);
}
const SomeonexFreeSpot = (props) =>{
	return (
		<div className="playerDetails__wrapper">
			<p className="playerDetails__name">Connecting...</p>
			<p>
				Até o momento nenhum jogador se conectou para ocupar esta posição.
				O administrador desta sala pode adicionar um bot para ocupar esta posição.
			</p>
			<Buttons>
				<CloseButton {...props}/>
				{props.iAmAdmin && (<TransformBotButton {...props} unMake = {false}/>)}
			</Buttons>
		</div>
	);	
}
const SomeonexSomeone = (props) => {
	const t = ((new Date().getTime() - props.player.get('connectedSince'))/60000).toFixed(1);
	return (
		<div className="playerDetails__wrapper">
			<p className="playerDetails__name">{props.player.get('name')}</p>
			<p>
				{props.player.get('name')} esta <font color="green">conectado </font> 
				a esta sala há {t} minutos e <b> 
				{props.player.get('isBot') ? `` : `não`} é um bot.</b>
			</p>
			{props.lookAtAdmin && (<p>
				{props.player.get('name')} é o administrador desta sala,
				como tal, ele pode adicionar bots a esta sala.
			</p>)}
			{props.player.get('isBot') && (<p>O administrador desta sala pode remover este bot.</p>)}
			<Buttons>
				{props.iAmAdmin && props.player.get('isBot') && (<TransformBotButton {...props} unMake = {true}/>)}
				<CloseButton {...props}/>
			</Buttons>
		</div>
	);
}
const Content = (props) => {
	const lookAtAdmin = props.player.get('socketId') === props.roomAdmin;
	const freeSpot = props.freeSpot;
	const iAmAdmin = props.roomAdmin === props.socketID;

	if(freeSpot)
		return <SomeonexFreeSpot {...props} iAmAdmin = {iAmAdmin}/>;
	return <SomeonexSomeone 
				{...props} 
				lookAtAdmin = {lookAtAdmin}
				iAmAdmin = {iAmAdmin}/>;
};
export default Content;