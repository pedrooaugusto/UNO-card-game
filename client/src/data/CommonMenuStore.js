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
			roomList:{
				rooms: [],
				status: 'LOADING'
			},
			roomInfo:{
				displayedRoom: {},
				isOpen: false,
				message: '',
				status: 'COMPLETE'
			},
			createRoom: {
				isOpen: false,
				message: '',
				created: false
			},
			aboutModal: false
		});
	}
	reduce(state, action){
		switch(action.type)
		{
			/* ROOM LIST EVENTS */
			case MenuActionTypes.ROOMS_LIST_LOAD_ALL_START:
				return state.updateIn(['roomList', 'status'], status => ('LOADING'));
				
			case MenuActionTypes.ROOMS_LIST_LOAD_ALL_COMPLETE:
				return state
					.updateIn(['roomList', 'status'], a => 'COMPLETE')
					.updateIn(['roomList', 'rooms'], a => Immutable.List(action.data));

			case MenuActionTypes.ROOMS_LIST_ADD:
				return state.updateIn(['roomList', 'rooms'], 
					rooms => rooms.push(action.data));
			
			case MenuActionTypes.ROOMS_LIST_DELETE:
				return state.updateIn(['roomList', 'rooms'], 
					rooms => rooms.filter( item => item.name !== action.data));

			
			/* ROOM INFO EVENTS */
			case MenuActionTypes.ROOM_INFO_MODAL_CLOSE:
				return state
					.setIn(['roomInfo', 'isOpen'], false)
					.setIn(['roomInfo', 'message'], '');

			case MenuActionTypes.ROOM_INFO_MODAL_OPEN:
				return state
					.setIn(['roomInfo', 'isOpen'], true)
					.setIn(['roomInfo', 'message'], '');

			case MenuActionTypes.ROOM_INFO_MODAL_LOAD_DATA:
				const room = state.getIn(['roomList', 'rooms']).find(
					a => a.name === action.data.roomName);
				return state
					.setIn(['roomInfo', 'displayedRoom'], room);

			case MenuActionTypes.ROOM_INFO_MODAL_JOIN_ROOM_FAIL:
				return state.setIn(['roomInfo', 'message'], action.data);

			case MenuActionTypes.ROOM_INFO_MODAL_JOIN_ROOM_SUCCESSFULL:
				return state
					.setIn(['roomInfo', 'message'], "Redirecting...")
					.setIn(['roomInfo', 'isOpen'], false);
			

			/* CREATE ROOM EVENTS */
			case MenuActionTypes.ROOM_CREATE_MODAL_OPEN:
				return state
					.updateIn(['createRoom', 'isOpen'], a => true);

			case MenuActionTypes.ROOM_CREATE_MODAL_CLOSE:
				return state
					.updateIn(['createRoom', 'isOpen'], a => false)
					.updateIn(['createRoom', 'created'], a => false)
					.updateIn(['createRoom', 'message'], a => '');		
			
			case MenuActionTypes.ROOM_CREATE_MODAL_CREATE_START:
				return state
					.updateIn(['createRoom', 'message'], a => 'Performing...');

			case MenuActionTypes.ROOM_CREATE_MODAL_CREATE_COMPLETE:
				return state
					.updateIn(['createRoom', 'created'], a => action.data.created)
					.updateIn(['createRoom', 'message'], a => action.data.message);

			case MenuActionTypes.MENU_MODAL_ABOUT:
				return state.update("aboutModal", a => action.data);

			default:
				return state;
		}
	}
}

export default new CommonMenuStore();