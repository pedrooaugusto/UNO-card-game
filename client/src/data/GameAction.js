import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import History from './History';


class GameAction{
	constructor(){
		Socket.getSocket().on("/game/send-card", data => {
            AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_PLAY_CARD_FINISH,
				data
			});			
			if(data.from === Socket.getSocket().id){
				for (let card of data.card) {
					card.fromBot = data.ctx.fromBot;
					card.botIndex = data.ctx.botIndex;
					AppDispatcher.dispatch({
						type: MenuActionTypes.GAME_USED_CARD,
						data: card
					});
				}
			}
		});
		Socket.getSocket().on("/game/timeouted", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_TIME_OUTED_EFF,
				data
			});
		});
		Socket.getSocket().on("/game/buy-card", data => {
			data.myself = data.from === Socket.getSocket().id;
			AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_BUY_CARD_FINISH,
				data
			});
		});
		Socket.getSocket().on("/game/new-message", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_MESSAGES_MODAL_NEW_MESSAGE,
				data
			});	
		});
		Socket.getSocket().on("/game/request-cards", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_LOAD_DATA_SUCCESSFUL,
				data
			});
			// const id = setInterval(() => {
			// 	AppDispatcher.dispatch({
			// 		type: MenuActionTypes.GAME_DECREMENT_TIME,
			// 		data: ((a) => {
			// 			Socket.getSocket().emit("/game/timeouted", a);						
			// 		})
			// 	});
			// }, 1000);
			// AppDispatcher.dispatch({
			// 	type: MenuActionTypes.GAME_SET_TIME_ID,
			// 	data: id
			// });
		});
		Socket.getSocket().on("/game/request-cards--bot", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_LOAD_BOT_DATA,
				data
			});
		});
		Socket.getSocket().on("/game/start/check/successful", (data) => {
			if(data.isAdmin){
				Socket.getSocket().emit("/game/request-cards");
			}
		});
		Socket.getSocket().on("/game/start/check/fail", data => {
			History.push("/nopermission");
		});
	}
	checkCredentials(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_LOAD_DATA_START
		});
		const data = {
			room: History.location.pathname.substr(6),
			player: Socket.getSocket().id
		};
		Socket.getSocket().emit("/game/start/check", data);
	}
	sendCard(data){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_PLAY_CARD_START
		});
		Socket.getSocket().emit("/game/send-card", data);
	}
	buyCard(ctx){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_BUY_CARD_START
		});
		Socket.getSocket().emit("/game/buy-card", ctx);
	}
	selectCard(id, un, color){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_SELECT_CARD,
			data: {id, un, color}
		});
	}
	onModalOpen(event){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_OPEN_CHAT
		});
	}
	onModalClose(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_CLOSE_CHAT
		});
	}
	onOpenChooseColor(event){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_OPEN_CHOOSE_COLOR
		});
	}
	onCloseChooseColor(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_CLOSE_CHOOSE_COLOR
		});
	}
	chooseColorSend(a){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_CHOOSE_COLOR_SEND_SET_DATA,
			data: a
		});
	}
	chooseColorSelect(a, b){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_CHOOSE_COLOR_SELECT_SET_DATA,
			data: {id: a, state: b}
		});
	}
	closeUnoing(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_CLOSE_UNOING
		});	
	}
	endGame(){
		History.push("/");
	}
	closeStandardModal(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_CLOSE_STANDARD_MODAL
		});	
	}
	openStandardModal(text){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_OPEN_STANDARD_MODAL,
			data: text
		});
	}
	buyCardsIsEmpty(text, ctx){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_OPEN_STANDARD_MODAL,
			data: text
		});
		Socket.getSocket().emit("/game/timeouted", ctx);
	}
	openRulesModal(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_RULES_MODAL,
			data: true
		});	
	}
	closeRulesModal(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_RULES_MODAL,
			data: false
		});	
	}
	openChat(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_MESSAGES_MODAL,
			data: true
		});	
	}
	closeChat(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_MESSAGES_MODAL,
			data: false
		});	
	}
	sendMessage(data){
		Socket.getSocket().emit("/game/new-message", data);
	}
	getActions(){
		return {
			sendCard: this.sendCard,
			selectCard: this.selectCard,
			checkCredentials: this.checkCredentials,
			buyCard: this.buyCard,
			onOpenChooseColor: this.onOpenChooseColor,
			onCloseChooseColor: this.onCloseChooseColor,
			chooseColorSend: this.chooseColorSend,
			chooseColorSelect: this.chooseColorSelect,
			closeUnoing: this.closeUnoing,
			endGame: this.endGame,
			openStandardModal: this.openStandardModal,
			closeStandardModal: this.closeStandardModal,
			buyCardsIsEmpty: this.buyCardsIsEmpty,
			openRulesModal: this.openRulesModal,
			closeRulesModal: this.closeRulesModal,
			openChat: this.openChat,
			closeChat: this.closeChat,
			sendMessage: this.sendMessage
		}
	}
}
export default new GameAction();