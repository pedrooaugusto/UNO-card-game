
function Welcome (playerName, roomName, admin, capacity, numberOfPlayers){
	const left = capacity - numberOfPlayers;
	const myself = admin === playerName;
	const text = `${playerName}, bem vindo a sala ${roomName}.
	Clique nos círculos acima para detalhes sobre os players conectados a esta sala.
	${myself ? `Você` : admin} como administrador pode adicionar bots a sala.`;
	return {
		from: {id: 'THE DOCTOR', name: 'System'},
		text
	};
}
function NewPlayer (playerName, left){
	const text = `${playerName} entrou na sala.
	${left > 1 ? `Flatam` : `Falta`} ${left} ${left > 1 ? `jogadores` : `jogador`} para começar o jogo.`;
	return {
		from: {id: 'THE DOCTOR', name: 'System'},
		text
	};
}
function NewBot (playerName, left){
	const text = `O administrador adicionou o bot ${playerName} a esta sala.
	${left > 1 ? `Flatam` : `Falta`} ${left} ${left > 1 ? `jogadores` : `jogador`} para começar o jogo`
	return {
		from: {id: 'THE DOCTOR', name: 'System'},
		text
	};
}

module.exports = {Welcome, NewPlayer, NewBot};