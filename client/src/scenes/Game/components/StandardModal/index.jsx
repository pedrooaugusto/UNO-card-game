import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = ({
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
});

const StandardModal = (props) => {
	return (
		<ReactModal
			className = "scene--game__room__unoing"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseModal}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel={props.title}>
	        	<div>
	        		<p>{props.text}</p>
	        		<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
	        		<div>
	        			<button
							className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
							onClick={props.onCloseModal}>
								Fechar
						</button>
	        		</div>
	        	</div>
	    </ReactModal>
	);
}

export default StandardModal;