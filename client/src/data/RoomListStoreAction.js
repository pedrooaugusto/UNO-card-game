import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import RoomsListStore from './RoomsListStore';

class RoomListStoreAction extends RoomsListStore{
	constructor(){
		super(AppDispatcher);
		Socket.getSocket().on("/home/load-all-rooms", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOMS_LIST_LOAD_ALL_COMPLETE,
				data
			});
		});
		Socket.getSocket().on("/app/join/home/successs", (data) => {
			Socket.setRoom(data);
		});
	}
	init(){
		Socket.getSocket().emit("/app/join/home");		
	}
	loadAll(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOMS_LIST_LOAD_ALL_START
		});
		Socket.getSocket().emit("/home/load-all-rooms");
	}
	addRoom(data){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOMS_LIST_ADD,
			data
		});
	}
	deleteRoom(data){
		AppDispatcher.dispatch({
			type: MenuActionTypes.ROOMS_LIST_DELETE,
			data
		});
	}
	getProps(){
		return{
			rooms: 		this.getState().get("rooms"),
			status: 	this.getState().get("status"),
			loadAll: 	this.loadAll,
			init: 		this.init,
			addRoom:	this.addRoom,
			deleteRoom: this.deleteRoom
		}
	}
}
export default new RoomListStoreAction();