import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex         : "999"
    }
};

const PlayerDeatailsName = (props) => {
	if(!props.freeSpot)
		return (<p className="playerDetails__name">{props.name}</p>);
	return (<p className="playerDetails__name">Connecting...</p>);
};

const PlayerDeatailsInfo = (props) => {
	if(props.freeSpot)
		return null;
	const t = ((new Date().getTime() - props.connectedSince)/60000).toFixed(1);
	return (
		<p>
			{props.name} esta <font color="green">conectado </font> 
			a esta sala há {t} minutos e <b> 
			{props.isBot ? `` : `não`} é um bot.</b>
		</p>
	);
};
const PlayerDeatailsInfoAdm = (props) => {
	if(!props.admin || props.freeSpot)
		return null;
	return(
		<p>
			{props.name} é o administrador desta sala, 
		    logo ele pode transformar players ainda não conectados em bots.
		</p>	
	);
}
const PlayerDeatailsInoFreeSpot = (props) => {
	if(!props.freeSpot)
		return null;
	return(
		<p>
		   	Até o momento nenhum jogador se conectou a esta posição, o administrador
		   	da sala pode transformar este jogador em um bot.
		</p>
	);
}
const ToBotButton = (props) => {
	if(props.loading === "COMPLETE" && props.admin && (props.freeSpot || props.isBot))
		return(
			<button 
				className="playerDeatails__buttons__button playerDeatails__buttons__button--toBot"
				onClick={props.onCloseModal}>
					Transformar em bot
			</button>
		);
	return null;
}
const CloseButton = (props) => {
	return (
  		<button
  			className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
  			onClick={props.onCloseModal}>
  			Fechar
  		</button>
	);
}

const PlayerInfoModal = (props) => {
	return(
		<ReactModal
			className="scene--hall__reactModal"
	    	isOpen={props.isOpen}
	        style={modalStyle}
	        onRequestClose={props.onCloseModal}
	        shouldCloseOnOverlayClick={true}
	        contentLabel="Info Jogador">
	        	{props.loadStatus === "LOADING" && (<h5 style={{"marginTop": "20px"}}><center>LOADING...</center></h5>)}
	        	{props.loadStatus === "COMPLETE" && (<div className="playerDetails__wrapper">
					<PlayerDeatailsName 
						name={props.player.name}
						freeSpot={props.freeSpot}/>
			        <PlayerDeatailsInfo 
			        	isBot = {props.player.isBot} 
			        	connectedSince = {props.player.connectedSince}
			        	name = {props.player.name}
			        	freeSpot = {props.freeSpot}/>
			        <PlayerDeatailsInfoAdm
			        	name = {props.player.name}
			        	admin = {props.player.id === props.roomAdmin}
			        	freeSpot = {props.freeSpot}/>
			        <PlayerDeatailsInoFreeSpot 
			        	name = {props.player.name}
			        	freeSpot = {props.freeSpot}/>
			        <div className="playerDeatails__footer--wrapper">
			        	<div className="playerDeatails__footer">
					        <div className="divider"></div>
					      	<div className="playerDeatails__buttons">
					      		<ToBotButton
					      			loading = {props.loadStatus}
					      			admin = {props.socketID === props.roomAdmin}
					      			isBot = {props.player.isBot}
					      			freeSpot = {props.freeSpot}
					      			onCloseModal = {props.onCloseModal}/>
					      		<CloseButton 
					      			onCloseModal = {props.onCloseModal}/>				   
					      	</div>
					    </div>
			      	</div>
	        	</div>)}
	    </ReactModal>
	);
}
export default PlayerInfoModal;