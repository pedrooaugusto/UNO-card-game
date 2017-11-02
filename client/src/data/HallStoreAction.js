import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import HallStore from './HallStore';
import History from './History';

class HallStoreAction extends HallStore{
	constructor(){
		super(AppDispatcher);
		Socket.getSocket().on("/hall/new-message", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE,
				data
			});			
		});
		Socket.getSocket().on("/hall/welcome-message", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE,
				data: data.message
			});
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_NEW_MEMBER,
				data: data.player
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
			History.push("/error");
		});
	}
	checkCredentials(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.HALL_LOAD_DATA_START
		});
		const data = {
			room: Socket.getRoom() || History.location.pathname.substr(6),
			player: Socket.getSocket().id
		};
		Socket.getSocket().emit("/hall/join-room/check", data);
	}
	sendMessage(data){
		Socket.getSocket().emit("/hall/new-message", data);
	}
	getProps(){
		return {
			room: this.getState().get("room"),
			players: this.getState().get("players"),
			messages: this.getState().get("messages"),
			sendMessage: this.sendMessage,
			checkCredentials: this.checkCredentials
		}
	}
}
export default new HallStoreAction();