import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import RoomInfoModalStore from './RoomInfoModalStore';
import History from './History';

class RoomInfoModalStoreAction extends RoomInfoModalStore{
	constructor(){
		super(AppDispatcher);
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
			Socket.setRoom(data);
			History.push(`/hall/${data}`);
		});
	}
	open(data){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_INFO_MODAL_OPEN
		});
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_INFO_MODAL_LOAD_DATA_START,
			data
		});
		Socket.getSocket().emit("/home/load-room-info", data.roomName);
	}
	close(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_INFO_MODAL_CLOSE
		});
	}
	join(data){
		Socket.getSocket().emit("/home/join-room", data);
	}
	getProps(){
		return {
			room: 		 this.getState().get("room"),
			isOpen:  	 this.getState().get("isOpen"),
			status: 	 this.getState().get("status"),
			message: 	 this.getState().get("message"),
			join: 		 this.join,
			onOpenRoom:  this.open,
			onCloseRoom: this.close
		}
	}
}
export default new RoomInfoModalStoreAction();