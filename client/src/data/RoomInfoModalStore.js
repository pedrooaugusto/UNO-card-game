import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';
import Room from './Room';

class RoomInfoModalStore extends ReduceStore
{
	getInitialState(){
		return Immutable.fromJS({
			isOpen: false,
			status: 'COMPLETE',
			message: '',
			room: new Room.Room() 
		});
	}
	reduce(state, action){
		switch(action.type)
		{
			case MenuActionTypes.ROOM_INFO_MODAL_CLOSE:
				return state.set('isOpen', false).set('message', '');

			case MenuActionTypes.ROOM_INFO_MODAL_OPEN:
				return state.set('isOpen', true).set('message', '');

			case MenuActionTypes.ROOM_INFO_MODAL_LOAD_DATA_START:
				return state
							.set('status', 'LOADING')
							.setIn(['room', 'name'], action.data.roomName);

			case MenuActionTypes.ROOM_INFO_MODAL_LOAD_DATA_COMPLETE:
				const room = Immutable.fromJS(action.data.room);
				const players = Immutable.fromJS(action.data.players);
				return state
					.set('status', 'COMPLETE')
					.set('room', room)
					.setIn(['room', 'players'], players);

			case MenuActionTypes.ROOM_INFO_MODAL_JOIN_ROOM_FAIL:
				return state.set('message', action.data);

			case MenuActionTypes.ROOM_INFO_MODAL_JOIN_ROOM_SUCCESSFULL:
				return state.set('message', "Redirecting...").set('isOpen', false);

			default:
				return state; 
		}
	}
}

export default RoomInfoModalStore;