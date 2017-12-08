import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = {
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
}
const style_ = ({
    backgroundColor: "#00bcd4",
    color: "#ffffff"
});

function submitNewColor(props) {
	const obj = Array.from(document.getElementsByName("color"));
	const color = obj.find(a => a.checked).value;
	if(props.chooseColor.get("id") === -1)
	{
		const k = props.chooseColor.get("dt");
		k.card[0].color = color;
		props.sendCard(k);
	}
	else
	{
		props.selectCard(props.chooseColor.get("id"), 
			props.chooseColor.get("state"), color);	
	}
	props.onCloseChooseColor();
}
const ChooseColor = (props) => {
	return (
		<ReactModal
			className = "scene--game__room__chooseColor"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseChooseColor}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel="Choose color">
	        	<div>
	        		<p>Escolha uma cor para ser usada daqui para frente</p>
	        		<div>
	        			<input type = "radio" name = "color"  id = "blue" value = "blue"/>
	        			<label htmlFor = "blue" style = {{color: "#000000"}}>Azul</label>
	        		</div>
	        		<div>
	        			<input type = "radio" name = "color" id = "red" value = "red"/>
	        			<label htmlFor = "red" style = {{color: "#000000"}}>Vermelho</label>
	        		</div>
	        		<div>
	        			<input type = "radio" name = "color" id = "yellow" value = "yellow"/>
	        			<label htmlFor = "yellow" style = {{color: "#000000"}}>Amarelo</label>
	        		</div>
	        		<div>
	        			<input type = "radio" name = "color" id = "green" value = "green"/>
	        			<label htmlFor = "green" style = {{color: "#000000"}}>Verde</label>
	        		</div>
	        		<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
	        		<div>
	        			<button 
							className="playerDeatails__buttons__button playerDeatails__buttons__button--toBot"
							onClick={() => submitNewColor(props)} style = {style_}>
								OK
						</button>
	        			<button
								className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
								onClick={props.onCloseChooseColor}>
									Fechar
							</button>
	        		</div>
	        	</div>
	    </ReactModal>
	);
}

export default ChooseColor;