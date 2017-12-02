import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';

class CommonHallStore extends ReduceStore
{
	constructor(){
		super(AppDispatcher);
	}
	getInitialState(){
		return Immutable.fromJS({
			room: undefined,
			messages: [],
			playerInfo:{
				isOpen: false,
				player: {},
				freeSpot: false
			}
		});
	}
	reduce(state, action){

		switch(action.type)
		{
			/* COMMON HALL STORE */
			case MenuActionTypes.HALL_LOAD_DATA_START:
				return state
					.update('room', a => undefined);
					
			case MenuActionTypes.HALL_LOAD_DATA_SUCCESSFUL:
				return state
					.update('room', a => Immutable.fromJS(action.data.room))
					.update('messages', a => Immutable.List());
			
			case MenuActionTypes.HALL_NEW_MEMBER:
				const playerg = state.getIn(['room', 'players'])
					.find(a => a.get("socketId") === action.data.socketId);
				if(playerg === undefined)
					return state
						.updateIn(['room', 'players'], 
							a => a.push(Immutable.fromJS(action.data)));
				return state;

			case MenuActionTypes.HALL_EXIT_MEMBER:
				return state
					.updateIn(['room', 'players'], 
						a => a.filter(b => b.get("socketId") !== action.data));
				
			case MenuActionTypes.HALL_RECEIVE_NEW_MESSAGE:
				return state
					.update('messages', a => a.push(action.data));
	
			
			/* PLAYER INFO STORE */
			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_OPEN:
				return state
					.updateIn(['playerInfo','isOpen'], a => true);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_CLOSE:
				return state
					.updateIn(['playerInfo','isOpen'], a => false)
					.updateIn(['playerInfo', 'freeSpot'], a => false);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_FREE_SPOT:
				return state
					.updateIn(['playerInfo', 'freeSpot'], a => true);

			case MenuActionTypes.HALL_PLAYER_INFO_MODAL_LOAD_DATA:
				const player = state.getIn(['room', 'players']).find(
					a => a.get("name") === action.data);
				return state
					.updateIn(['playerInfo', 'player'], a => player)
					.updateIn(['playerInfo', 'freeSpot'], a => false);

			default:
				return state; 
		}
	}
}

export default new CommonHallStore();