import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = ({
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
});

const RulesModal = (props) => {
	return (
		<ReactModal
			className = "scene--game__room__rules"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseModal}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel={"Rules"}>
	        	<div className = "body">
	        		<div className = "title">Ajuda</div>
	        		<p>
	        			Bom, se você esta aqui esta interface provavelmente não é tão 
	        			intuitiva quanto deveria ser (...), sorry. Anyway, 
	        			logo abaixo você encontra um FAQ e as regras do jogo.
	        		</p>
	        		<ul className = "faq" type = "circle">
	        			<li className = "question">
	        				Como jogar múltiplas cartas ?
	        			</li>
	        			<li className = "answer">
	        				Dois cliques... Depois de dar dois cliques em uma carta
	        				irá notar duas coisas: <br/>(1) Ela ficou menor, o que significa que ela esta selecionada.
	        				<br/>(2) O surgimento de um novo botão, Send All, que envia todas as cartas selecionadas.
	        			</li>
	        			<li className = "question">
	        				Como deselecionar uma carta ?
	        			</li>
	        			<li className = "answer">
	        				Well, double click it again!
	        			</li>
	        			<li className = "question">
	        				Por que esse cronômetro não sai do 31s e não funciona ?
	        			</li>
	        			<li className = "answer">
	        				Eu até cheguei a implementar, mas me deu ansieadade então achei melhor 
	        				comentei ele.
	        			</li>
	        			<li className = "question">
	        				Como saber de quem é a vez de jogar ?
	        			</li>
	        			<li className = "answer">
	        				Logo abaixo do nome da sala existem vários círculos com uma 
	        				letra dentro, cada círculo representa um jogador e a letra é 
	        				a primeira de seu nome, o círculo que estiver diferente 
	        				(aquele sem fundo azul) corresponde ao jogador que esta jogando.
	        			</li>
	        			<li className = "question">
	        				Ok, mas quando é a MINHA vez ?
	        			</li>
	        			<li className = "answer">
	        				Basicamente quando estiver escrito na tela "YOU have..." ao invés
	        				de "FULANO have...".
	        			</li>
	        			<li className = "question">
	        				Como saber quantas cartas o último jogador jogou?
	        			</li>
	        			<li className = "answer">
	        				Depois de qualquer ação de comprar ou jogar, logo abaixo do círculo corresponde
	        				ao jogador que comprou ou vendeu vai subir um número positivo para números
	        				de cartas compradas ou negativo para números de cartas jogadas.
	        			</li>
	        			<li className = "question">
	        				O quão inteligentes são os bots?
	        			</li>
	        			<li className = "answer">
	        				Eles só jogam a primeira carta em seu deck que é compatível com
	        				a última jogada, ah, e assim como eu, eles gostam de azul.
	        				Talvez em 06/2018 eu treine uma IA pra jogar Uno...
	        			</li>
	        			<li className = "question">
	        				Por que tem um círculo pulsando ?
	        			</li>
	        			<li className = "answer">
	        				Porque ele está em estado de Uno!
	        			</li>
	        			<li className = "question">
	        				WTF! De acordo com as suas regras essa combinação de cartas nem deveria ser permitida! 
	        			</li>
	        			<li className = "answer">
	        				Legal! Abre uma issue lá no github.
	        			</li>
	        			<li className = "question">
	        				Aha! Eu encontrei um bug!
	        			</li>
	        			<li className = "answer">
	        				Legal! Abre uma issue lá no github.
	        			</li>
	        			<li className = "question">
	        				Code ???
	        			</li>
	        			<li className = "answer">
		        			<a 
		        				href = "https://github.com/pedrooaugusto/UNO-card-game" 
		        				target = "_blank"
		        				rel = "noopener noreferrer">
		        					https://github.com/pedrooaugusto/UNO-card-game
		        			</a>
	        			</li>
	        		</ul>
	        		<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
	        		<div className = "rulas">
	        			<div className = "lab">REGRAS</div>
	        			<div className = "text">
	        				As regras do Uno são bem simples, basicamente
	        				você precisa jogar uma carta com cor
	        				ou conteúdo igual a última carta jogada e caso não tenha nenhuma
	        				carta que satisfaça esta condição você compra uma carta e passa a vez.
	        				O objetivo do jogo é ficar sem cartas.
	        				Lembrando que as cartas com fundo preto não precisam satisfazer 
	        				nenhuma condição e que você pode jogar mais de uma carta se a primeira 
	        				der match na carta atual e todas as subsequentes derem match no 
	        				conteúdo da primeira (???).<br/>
	        				Aqui vai um copy past dá wikipedia:<br/><br/>
	        				<div>
	        					<b>UNO®</b> é um jogo de cartas desenvolvido pela Mattel. 
	        					Recomenda-se de dois a dez jogadores para jogá-lo, a partir
	        					de 7 anos de idade.<br/><br/>
								<b>Objetivo:</b> ser o primeiro a ficar sem cartas na mão, 
								utilizando todos os recursos possíveis para impedir que os
								outros jogadores façam o mesmo.<br/><br/>
								<b>Como jogar:</b> Cada jogador recebe 7 cartas. O restante 
								do baralho é deixado na mesa com a face virada para baixo e
								então vira-se a primeira carta do monte. Esta carta que fica
								em cima da mesa serve como base para que o jogo comece.<br/>
								O jogador a esquerda do que distribuiu as cartas inicia o jogo,
								que segue em sentido horário. Os jogadores devem jogar, na sua vez,
								uma carta de mesmo número, cor, OU símbolo da carta que está na mesa.
								Exemplo: se a carta inicial for um 2 vermelho o primeiro jogador deve 
								jogar sobre ela um 2 (não importando a cor) ou uma carta vermelha 
								(não importando o número). O jogador sucessivo faz o mesmo, dessa vez
								valendo como base a carta colocada pelo jogador anterior.<br/><br/>

								<b>Cartas especiais:</b> Além das cartas numéricas, o baralho de UNO 
								possui mais 5 cartas especiais que produzem diferentes efeitos 
								durante o jogo:<br/>
								<ul>
									<li>
										<b>Inversão:</b> o sentido de jogo inverte-se. Se o sentido 
										do jogo está no sentido horário, quando jogada uma carta 
										“Inverter”, joga-se em sentido anti-horário.
									</li>
									<li>
										<b>Bloqueio:</b> o próximo jogador perde a vez.
									</li>
									<li>
										<b>+2:</b> o próximo jogador tem que apanhar duas cartas e passa
										o seu turno ao jogador seguinte.
									</li>
									<li>
										<b>Curinga:</b> essa carta pode ser jogada a qualquer momento do 
										jogo independentemente da carta que se encontra no topo de descarte.
										Quem jogar essa carta escolhe a próxima cor do jogo (azul, verde, vermelho
										ou amarelo).
									</li>
									<li>
										<b>Curinga +4:</b> o próximo jogador é obrigado a apanhar quatro 
										cartas do baralho e passar a vez, assim como o curinga normal, quem
										jogar essa carta escolhe a próxima cor do jogo (verde, azul, vermelho ou
										amarelo).
									</li>
								</ul>
	        				</div>
	        			</div>
	        		</div>
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

export default RulesModal;