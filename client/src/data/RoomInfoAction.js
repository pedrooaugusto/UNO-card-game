import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import History from './History';

class RoomInfoAction{
	constructor(){
		Socket.getSocket().on("/home/load-room-info", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOM_INFO_MODAL_LOAD_DATA_COMPLETE,
				data
			});
		});
		Socket.getSocket().on("/home/join-room/fail", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOM_INFO_MODAL_JOIN_ROOM_FAIL,
				data
			});
		});
		Socket.getSocket().on("/hall/join-room/successful", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOM_INFO_MODAL_JOIN_ROOM_SUCCESSFULL
			});
			History.push(`/hall/${data}`);
		});
	}
	open(data){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_INFO_MODAL_OPEN
		});
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_INFO_MODAL_LOAD_DATA,
			data
		});
	}
	close(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_INFO_MODAL_CLOSE
		});
	}
	join(data){
		Socket.getSocket().emit("/home/join-room", data);
	}
	getActions(){
		return {
			join: 		 this.join,
			onOpenRoom:  this.open,
			onCloseRoom: this.close
		}
	}
}
export default new RoomInfoAction();