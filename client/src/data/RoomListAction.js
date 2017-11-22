import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';

class RoomListAction{
	constructor(){
		Socket.getSocket().on("/home/load-all-rooms", (data) => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.ROOMS_LIST_LOAD_ALL_COMPLETE,
				data
			});
		});
		Socket.getSocket().on("/app/join/home/success", (data) => {
			console.log('Connected...');
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
	getActions(){
		return{
			loadAll: 	this.loadAll,
			init: 		this.init
		}
	}
}
export default new RoomListAction();