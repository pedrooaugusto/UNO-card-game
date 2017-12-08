import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = ({
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
});

const EndGameModal = (props) => {
	const players = props.players.sort((a, b) => a.numCards > b.numCards);
	return (
		<ReactModal
			className = "scene--game__room__endGame"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseModal}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel="Game Over">
	        	<div>
	        		<center>
		        		<p>{players.get(0) && (<span><b>{players.get(0).name}</b> ganhou o jogo!</span>)}</p>
	        		</center>
	        		<ul>
	        			{players.slice(1).map((a, b) => (<li key = {b}>{b+2}º {a.name} - {a.numCards} carta(s)</li>))}
	        		</ul>
	        		<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
	        		<div>
	        			<button
							className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
							onClick={props.onCloseModal}>
								Sair
						</button>
	        		</div>
	        	</div>
	    </ReactModal>
	);
}

export default EndGameModal;