import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';
import Room from './Room';

class RoomsListStore extends ReduceStore
{
	getInitialState(){
		return Immutable.fromJS({
			status: 'LOADING',
			rooms : []
		});
	}
	reduce(state, action){
		switch(action.type)
		{
			case MenuActionTypes.ROOMS_LIST_LOAD_ALL_START:
				return state.update('status', status => ('LOADING'));
				
			case MenuActionTypes.ROOMS_LIST_LOAD_ALL_COMPLETE:
				return state
					.update('status', a => 'COMPLETE')
					.update('rooms', a => Immutable.List(action.data));

			case MenuActionTypes.ROOMS_LIST_ADD:
				return state.update('rooms', rooms => rooms.push(Room.Create(action.data)));
			
			case MenuActionTypes.ROOMS_LIST_DELETE:
				return state.update('rooms', rooms => rooms.filter((item) => item.id !== parseInt(action.data, 10)));

			default:
				return state;
		}
	}
}
export default RoomsListStore;
//export default new RoomsListStore();