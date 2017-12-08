import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = ({
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
});

const UnoModal = (props) => {
	return (
		<ReactModal
			className = "scene--game__room__unoing"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseUnoModal}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel="Someone is Unoing">
	        	<div>
	        		<p>{props.playerName} fez Uno!</p>
	        		<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
	        		<div>
	        			<button
							className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
							onClick={props.onCloseUnoModal}>
								Fechar
						</button>
	        		</div>
	        	</div>
	    </ReactModal>
	);
}

export default UnoModal;