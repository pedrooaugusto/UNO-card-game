import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './styles.css';

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex         : "999"
    },
    content : {
        minWidth              : '40%',
        top                   : '50%',
        minHeight             : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border                : "none",
        borderRadius          : "none",
        backgroundColor       : "white"
    },
    preloaderWrapper:{
        marginTop: "50px",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center"
    }
};
class CreateRoomModal extends React.Component {
	handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		this.props.onCreate(form);
	};
	render()
	{
		return(
			<ReactModal
		    	isOpen={this.props.isOpen}
		        style={modalStyle}
		        onRequestClose={this.props.onCloseModal}
		        shouldCloseOnOverlayClick={true}
		        contentLabel="Criar sala">
		        	<div className="container">
		            	<div className="row">
		                	<div className="col s12 modal__title">
		                		Crie sua sala
		                    </div>
		                </div>
		            	<div className="row">
		            		<div className="col s12">
		            			<form method="post" onSubmit={this.handleSubmit} action="#" className="modal__form">
		            				<div className="form__input">
		            					<label>Nome da sala</label>
		            					<input type="text" name="name" maxLength="15" autoComplete="off" required/>
		            				</div>
		            				<div className="form__input">
		            					<label>Username:</label>
		            					<input name="nickName" type="text" maxLength="12" autoComplete="off" required/>
		            				</div>
		            				<div className="form__input">
		            					<label>Quantidade de jogadores</label>
		            					<input name="capacity" type="number" min="2" max="7" required/>
		            				</div>
		            				<div className="form__button form__button--send">
		            					<button type="submit">CRIAR</button>
		            				</div>
		            				<div className="form__feedback-message">
		            					{this.props.message}
		            				</div>
		            			</form>
		                	</div>
		            	</div>
		            </div>
		    </ReactModal>
		);
    };
}
CreateRoomModal.propTypes = {
	created: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	onCloseModal: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
}
export default CreateRoomModal;
