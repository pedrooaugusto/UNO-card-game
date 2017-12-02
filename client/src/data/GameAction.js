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
				AppDispatcher.dispatch({
					type: MenuActionTypes.GAME_USED_CARD,
					data: data.card[0]
				});
			}
		});
		Socket.getSocket().on("/game/request-cards", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.GAME_LOAD_DATA_SUCCESSFUL,
				data
			});
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
	selectCard(id, un){
		AppDispatcher.dispatch({
			type: MenuActionTypes.GAME_SELECT_CARD,
			data: {id, un}
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
	getActions(){
		return {
			sendCard: this.sendCard,
			selectCard: this.selectCard,
			checkCredentials: this.checkCredentials
		}
	}
}
export default new GameAction();