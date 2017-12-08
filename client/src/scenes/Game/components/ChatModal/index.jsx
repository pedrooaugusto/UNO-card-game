import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = {
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
}

const ChatModal = (props) => {
	function sendMessage(event) {
		if(event.keyCode === 13 && event.target.value !== ""){
			const message = {
				from: props.myName,
				text: event.target.value,
				socketId: props.socketId,
				room: props.roomName
			};
			props.sendMessage(message);
			event.target.value = "";
		}
	}
	return (
		<ReactModal
			className = "scene--game__room__chat"
			isOpen={props.isOpen}
			style={modalStyle}
			onRequestClose = {props.onCloseModal}
			shouldCloseOnOverlayClick={true}
			contentLabel="Chat">
	        	<div className = "chat__room">
	        		<div className = "header">
	        			<div className = "text">{props.roomName}</div>
	        			<div className = "icon" onClick = {props.onCloseModal}>x</div>
	        		</div>
	        		<div className = "messages">
	        			{props.messages.map((a, b) => {
	        				const clName = a.get("socketId") === props.socketId ? "message myself" : "message";
	        				return(
	        					<div
	        						key = {b} 
	        						className = "message-wrapper">
	        						<div className = {clName}>
		        						<div className = "from">{a.get('from')}</div>
		        						<div className = "text">{a.get('text')}</div>
		        					</div>	
	        					</div>)	
	        			})}
	        		</div>
	        		<div className = "input__">
	        			<input 
	        				type = "text" 
	        				name = "msg" 
	        				autoFocus="true" 
	        				onKeyUp = {sendMessage}/>
	        		</div>
	        	</div>
		</ReactModal>
	);
}

export default ChatModal;