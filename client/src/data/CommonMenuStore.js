import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';

class CommonMenuStore extends ReduceStore
{
	constructor(){
		super(AppDispatcher);
	}
	getInitialState(){
		return Immutable.fromJS({
			roomInfoIsOpen: false,
			createRoomIsOpen: false 
		});
	}
	reduce(state, action){
		switch(action.type)
		{
			case MenuActionTypes.MODAL_ROOM_INFO_OPEN:
				return state.update('roomInfoIsOpen', a => (true));

			case MenuActionTypes.MODAL_ROOM_INFO_CLOSE:
				return state.update("roomInfoIsOpen", a => (false));

			case MenuActionTypes.MODAL_CREATE_ROOM_OPEN:
				return state.update('createRoomIsOpen', a => (true));

			case MenuActionTypes.MODAL_CREATE_ROOM_CLOSE:
				return state.update("createRoomIsOpen", a => (false));
			
			default:
				return state;
		}
	}
}

export default new CommonMenuStore();