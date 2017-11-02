import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import CreateRoomStore from './CreateRoomStore';
import History from './History';

class CreateRoomStoreAction extends CreateRoomStore{
	constructor(){
		super(AppDispatcher);
		Socket.getSocket().on("/home/create-room/fail", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOM_CREATE_MODAL_CREATE_COMPLETE,
				data
			});
		});
		Socket.getSocket().on("/home/create-room/success", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOM_CREATE_MODAL_CREATE_COMPLETE,
				data
			});
			AppDispatcher.dispatch({type: MenuActionTypes.ROOM_CREATE_MODAL_CLOSE});
			Socket.setRoom(data.roomName);
			History.push(`/hall/${data.roomName}`);
		});
	}
	open(){
		AppDispatcher.dispatch({type: MenuActionTypes.ROOM_CREATE_MODAL_OPEN});
	}
	close(){
		AppDispatcher.dispatch({type: MenuActionTypes.ROOM_CREATE_MODAL_CLOSE});
	}
	create(data){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOM_CREATE_MODAL_CREATE_START
		});
		let result = {};
		for(let [k, v] of new FormData(data).entries())
    		result[k] = v;
		Socket.getSocket().emit("/home/create-room", result);
	}
	getProps(){
		return {		
			isOpen:   	  this.getState().get("isOpen"),
			created:      this.getState().get("created"),
			message: 	  this.getState().get("message"), 
			onOpenModal:  this.open,
			onCloseModal: this.close,
			onCreate: 	  this.create
		}
	}
}
export default new CreateRoomStoreAction();