import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Socket from './DefaultSocket';
import HallPlayerInfoStore from './HallPlayerInfoStore';

class HallPlayerInfoStoreAction extends HallPlayerInfoStore{
	constructor(){
		super(AppDispatcher);
		Socket.getSocket().on("/hall/load-info-player-fail", data => {
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_FAIL,
				data
			});			
		});
		Socket.getSocket().on("/hall/load-info-player-success", data => {
			console.log('here on client');
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_SUCCESS,
				data
			});			
		});
	}
	onModalOpen(event){
		AppDispatcher.dispatch({
			type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_OPEN
		});
		if(event.target.dataset.freeSpot === "true"){
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_FREE_SPOT
			});
		}
		else{
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_START
			});
			Socket.getSocket().emit("/hall/load-info-player", event.target.dataset.name);
		}
	}
	onModalClose(){
		AppDispatcher.dispatch({
			type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_CLOSE
		});
	}
	loadData(data, ok){
		if(ok){
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_FREE_SPOT
			});
		}
		else{
			AppDispatcher.dispatch({
				type: MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_START
			});
			Socket.getSocket().emit("/hall/load-info-player", data);
		}
	}
	getProps(){
		return {
			isOpen: this.getState().get("isOpen"),
			loadStatus: this.getState().get("loadStatus"),
			message: this.getState().get("message"),
			freeSpot: this.getState().get("freeSpot"),
			player: this.getState().get("player"),
			onModalOpen: this.onModalOpen,
			onModalClose: this.onModalClose,
			loadData: this.loadData
		}
	}
}
export default new HallPlayerInfoStoreAction();