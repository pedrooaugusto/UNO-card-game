import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';

class HallStore extends ReduceStore
{
	getInitialState(){
		return Immutable.fromJS({
			room: {},
			players: [],
			messages: []
		});
	}
	reduce(state, action){

		switch(action.type)
		{
			case MenuActionTypes.HALL_LOAD_DATA_START:
				return state
					.update('room', a => undefined)
					.update('players', a => undefined);
					
			case MenuActionTypes.HALL_LOAD_DATA_SUCCESSFUL:
				return state
					.update('room', a => action.data.room)
					.update('players', a => action.data.players)
					.update('messages', a => Immutable.List());
			
			case MenuActionTypes.HALL_NEW_MEMBER:
				if(!state.get('players').find(a => a.id === action.data.id))
					return state.update('players', a => a.concat(action.data));
				return state;

			case MenuActionTypes.HALL_EXIT_MEMBER:
				return state
				.update('players', a => a.filter(b => b.id !== action.data))
				.update('[room, numberOfPlayers]', a => a-1);
				
			case MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE:
				return state.update('messages', a => a.push(action.data));
	
			default:
				return state; 
		}
	}
}

export default HallStore;