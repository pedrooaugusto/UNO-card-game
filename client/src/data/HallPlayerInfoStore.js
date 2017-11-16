import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';


class HallPlayerInfoStore extends ReduceStore{
	/*
	isOpen: true,
	loadStatus: 'COMPLETE',
	message: 'ok',
	freeSpot: false,
	player:{
		id: '90d8vu8v9fuf98ugvndf8dd943jNUEHIHj9u',
		name: 'Pedro Augusto'
		admin: true,
		isBot: false,
		connected: true
		connectedSince: 151049185
		5653
	}
	*/
	getInitialState(){
		return Immutable.fromJS({
			isOpen: false,
			loadStatus: "LOADING",
			message: 'ok',
			freeSpot: false,
			player: {}
		});
	}
	reduce(state, action){

		switch(action.type)
		{
			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_OPEN:
				return state
					.update('isOpen', a => true);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_CLOSE:
				return state
					.update('isOpen', a => false)
					.update('loadStatus', a => 'LOADING')
					.update('freeSpot', a => false);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_FREE_SPOT:
				return state
					.update('loadStatus', a => 'COMPLETE')
					.update('freeSpot', a => true);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_START:
				return state
					.update('loadStatus', a => 'LOADING');

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_FAIL:
				return state
					.update('loadStatus', a => 'COMPLETE')
					.update('message', a => action.data.message);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA_SUCCESS:
				return state
					.update('loadStatus', a => 'COMPLETE')
					.update('message', a => action.data.message)
					.update('player', a => action.data.player)
					.update('freeSpot', a => false);

			default:
				return state; 
		}
	}
}

export default HallPlayerInfoStore;