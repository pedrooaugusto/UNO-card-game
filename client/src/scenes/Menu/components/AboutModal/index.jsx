import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = ({
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
});

const AboutModal = (props) => {
	return (
		<ReactModal
			className = "scene--game__room__rules"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseModal}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel={"About"}>
	        	<div className = "body">
	        		<div className = "title">About</div>
	        		<ul className = "faq">
	        			<li className = "question">
	        				O que é isso ?
	        			</li>
	        			<li className = "answer">
	        				Uma implementação do jogo de cartas UNO utilizando MERN 
	        				Stack (Mongo, Express, React and Nodejs) e SocketIO. 
	        			</li>
	        			<li className = "question">
	        				Como funciona ?
	        			</li>
	        			<li className = "answer">
	        				Bom, como a maioria dos jogos online. Existe uma tela onde você
	        				escolhe ou cria uma sala para jogar (esta tela), uma outra
	        				onde, com a sala já criada, você espera por mais jogadores se 
	        				conectarem e pode adicionar bots e falar no chat.
	        				E por fim a última tela onde o jogo ocorre.
	        			</li>
	        			<li className = "question">
	        				Quem fez e por qual razão?
	        			</li>
	        			<li className = "answer">
	        				Eu, Pedro Augusto, fiz essa aplicação entre 10/2017 e 12/2017 com o 
	        				intuito de aprender React & Flux colocando as mãos na massa. Eu escolhi
	        				implementar o jogo UNO por 3 motivos: (1) já
	        				estava fazendo um jogo de dominó para android (ambos são jogos de cartas), 
	        				(2) já havia feito um chat p2p para windows e android usando java (O Uno nada mais é
	        				do que um grande chat onde cada mensagem resulta em uma ação...) e (3) já havia 
	        				criado um jogo da velha em JS+HTML (O bot do Uno é bem parecido com o bot que 
	        				criei para o jogo da velha).
	        			</li>
	        			<li className = "question">
	        				Github ?? Code ??
	        			</li>
	        			<li className = "answer">
	        				<a 
		        				href = "https://github.com/pedrooaugusto/UNO-card-game" 
		        				target = "_blank"
		        				rel = "noopener noreferrer">
		        					https://github.com/pedrooaugusto/UNO-card-game
		        			</a>
	        			</li>
	        			<li className = "question">
	        				Parece legal, como se joga?
	        			</li>
	        			<li className = "answer">
	        				Se você nunca jogou UNO antes eu recomendo criar uma sala pra 2 jogadores
	        				adicionar um bot e clicar no botão de ajuda, lá tem um texto com as regras
	        				do jogo e tal.
	        			</li>
	        			<li className = "question">
	        				Onde usou o Mongo?
	        			</li>
	        			<li className = "answer">
	        				O mongo foi usadado para armazenar informações sobre a sala e os players 
	        				conctados a ela. Infelizmente, não pude armazenar o que esta acontecendo
	        				em cada sala durante o jogo, já que todas as ações (comprar carta e jogar carta)
	        				iriam resultar em uma operação no banco e eu uso o MLab de graça, provavelmente eles
	        				me chutariam... 
	        			</li>
	        			<li className = "question">
	        				Onde usou o Express?
	        			</li>
	        			<li className = "answer">
	        				Trabalhar com require('http') não é muito viável né?
	        			</li>
	        			<li className = "question">
	        				Onde usou o React?
	        			</li>
	        			<li className = "answer">
	        				React is the whole point dessa aplicação. Eu comecei esse projeto para 
	        				aprender pelo menos o básico de React & Flux enquanto fazia esta aplicação.
	        			</li>
	        		</ul>
	        	</div>
	        	<div className = "footer">
		        	<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
		        	<button
						className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
						onClick={props.onCloseModal}>
							Fechar
					</button>
	        	</div>
	    </ReactModal>
	);
}

export default AboutModal;