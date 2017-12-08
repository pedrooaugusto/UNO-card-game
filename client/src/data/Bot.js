import Socket from './DefaultSocket';

class Bot
{
	play(context){
		const myIndex = context.get("currentPlayer");
		const myName = context.getIn(["room", "players"]).get(myIndex).get("name");
		const mySelf = context.get("bots").find(a => a.get("name") === myName);
		const myIndexBot = context.get("bots").findIndex(a => a.get("name") === myName);
		// console.log(mySelf.get("yourCards").map(a => (a.get("name")))._tail.array);
		if(context.getIn(["needToBuy", "howMany"]) > 0)
		{
			this.buy(context, myIndexBot);
		}
		else
		{
			const card = this.whichCard(context, mySelf.get("yourCards"));
			if(card)
			{
				// console.log("Carta escolhida: "+card.get("name"));
				const rotate = ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6));
				const obj = {
					card: [{
						id: card.get("id"),
						name: card.get("name"),
						from: context.get('currentPlayer'),
						rotate,
						color: card.get("color")
					}],
					ctx: {
						currentPlayerIndex: context.get('currentPlayer'),
						capacity: context.getIn(['room', 'capacity']),
						direction: context.get('direction'),
						fromBot: true,
						botIndex: myIndexBot
					}
				};
				Socket.getSocket().emit("/game/send-card", obj);			
			}
			else
			{
				this.buy(context, myIndexBot);
			}
		}
	}
	buy(context, botIndex){
		const ctx = {
			currentPlayerIndex: context.get('currentPlayer'),
			capacity: context.getIn(['room', 'capacity']),
			direction: context.get('direction'),
			needToBuy: context.getIn(['needToBuy', 'howMany']),
			fromBot: true,
			botIndex,
			myId: Socket.getSocket().id,
			pass: false
		};
		if(context.get('unUsedCards').size === 0)
			Socket.getSocket().emit("/game/timeouted", ctx);
		else
			Socket.getSocket().emit("/game/buy-card", ctx);
	}
	whichCard(context, myCards){
		const lastCard = context.get("usedCards").get(context.get("usedCards").size - 1);
		let card = null;
		for(let i = 0; i < myCards.size; i++)
		{
			if(this.checkCard(myCards.get(i), lastCard))
			{
				card = myCards.get(i);
				break;
			}
		}
		if(card && (card.get("name") === "buy-four" || card.get("name") === "change-color"))
		{
			card = card.set("color", "blue");
		}
		return card;
	}
	checkCard(current, last){
		const n1 = current.name || current.get("name");
		const arrNameLast = last.get("name").split("-");
		const arrNameCurrent = n1.split("-");
		if(n1 === "buy-four" || n1 === "change-color")//coringa sem restrição
			return true;
		if((last.get("name") === "change-color" || last.get("name") === "buy-four")//se o último for coringa match na cor
			&& last.get("color") === arrNameCurrent[0])
			return true;
		else if(last.get("name") === "change-color" || last.get("name") === "buy-four")// se não deu match na cor nao vai dar em nada
			return false;
		if(arrNameCurrent[0] === arrNameLast[0])//cores iguais para cartas não coringa
			return true;
		if(arrNameCurrent[1] === arrNameLast[1])//ações iguais para cartas não coringa
			return true;
		return false;
	}
}
export default new Bot();