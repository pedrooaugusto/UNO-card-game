import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import History from './History';


class HallAction{
	constructor(){
		Socket.getSocket().on("/hall/new-message", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE,
				data
			});			
		});
		Socket.getSocket().on("/hall/new-member", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE,
				data: data.message
			});
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_NEW_MEMBER,
				data: data.player
			});
			// console.log(data);
			if(data.full){
				const r = History.location.pathname.substr(6);
				setTimeout(() => History.push("/game/"+r), 2000);
			}
		});
		Socket.getSocket().on("/hall/exit-member", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE,
				data: data.message
			});
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_EXIT_MEMBER,
				data: data.playerId
			});
		});
		Socket.getSocket().on("/hall/welcome-message", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE,
				data: data.message
			});
		});
		Socket.getSocket().on("/hall/join-room/check/successful", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_LOAD_DATA_SUCCESSFUL,
				data
			});
		});
		Socket.getSocket().on("/hall/join-room/check/fail", data => {
			console.log(data);
			History.push("/nopermission");
		});
		Socket.getSocket().on("/hall/exit", data => {
			History.push("/");
		});
		Socket.getSocket().on("/hall/add-bot-success", data => {
			this.onModalClose();
		});
		Socket.getSocket().on("/hall/add-bot-fail", data => {
			window.alert(data.message);
			this.onModalClose();
		});
		Socket.getSocket().on("/hall/remove-bot-success", data => {
			this.onModalClose();
		});
	}
	checkCredentials(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.HALL_LOAD_DATA_START
		});
		const data = {
			room: History.location.pathname.substr(6),
			player: Socket.getSocket().id
		};
		Socket.getSocket().emit("/hall/join-room/check", data);
	}
	sendMessage(data){
		Socket.getSocket().emit("/hall/new-message", data);
	}
	exit(){
		Socket.getSocket().emit("/hall/exit", false);		
	}
	addBot(){
		Socket.getSocket().emit("/hall/add-bot");	
	}
	removeBot(name){
		Socket.getSocket().emit("/hall/remove-bot", name);	
	}
	onModalOpen(event){
		AppDispatcher.dispatch({
			type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_OPEN
		});
		const ok = event.target.dataset.freeSpot === "true";
		const data = event.target.dataset.name;
		const type = ok ? 
			MenuActionTypes.HALL_PLAYER_INFO_MODAL_FREE_SPOT :
			MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA;
		AppDispatcher.dispatch({
			type,
			data
		});
	}
	onModalClose(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_CLOSE
		});
	}
	getActions(){
		return {
			sendMessage: this.sendMessage,
			checkCredentials: this.checkCredentials,
			exit: this.exit,
			onModalClose: this.onModalClose,
			onModalOpen: this.onModalOpen,
			addBot: this.addBot,
			removeBot: this.removeBot
		}
	}
}
export default new HallAction();