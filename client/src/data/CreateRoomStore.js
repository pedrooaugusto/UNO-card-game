import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';

class CreateRoomStore extends ReduceStore
{
	getInitialState(){
		return Immutable.fromJS({
			isOpen: false,
			created: false,
			message: ''
		});
	}
	reduce(state, action){
		switch(action.type)
		{
			case MenuActionTypes.ROOM_CREATE_MODAL_OPEN:
				return state.update('isOpen', a => true);

			case MenuActionTypes.ROOM_CREATE_MODAL_CLOSE:
				return state
					.update('isOpen', a => false)
					.update('created', a => false)
					.update('message', a => '');		
			
			case MenuActionTypes.ROOM_CREATE_MODAL_CREATE_START:
				return state.update('message', a => 'Performing...');

			case MenuActionTypes.ROOM_CREATE_MODAL_CREATE_COMPLETE:
				return state
				.update('created', a => action.data.created)
				.update('message', a => action.data.message);

			default:
				return state; 
		}
	}
}

export default CreateRoomStore;