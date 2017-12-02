/*
	Menu scenes ActionTypes
*/
const MenuActionTypes = {
	ROOMS_LIST_LOAD_ALL_START: 'ROOMS_LIST_LOAD_ALL_START',
	ROOMS_LIST_LOAD_ALL_COMPLETE: 'ROOMS_LIST_LOAD_ALL_COMPLETE',
	ROOMS_LIST_ADD: 'ROOMS_LIST_ADD',
	ROOMS_LIST_DELETE: 'ROOMS_LIST_DELETE',

	ROOM_INFO_MODAL_OPEN: 'ROOM_INFO_MODAL_OPEN',
	ROOM_INFO_MODAL_CLOSE: 'ROOM_INFO_MODAL_CLOSE',
	ROOM_INFO_MODAL_LOAD_DATA: 'ROOM_INFO_MODAL_LOAD_DATA',
	ROOM_INFO_MODAL_JOIN_ROOM_FAIL: 'ROOM_INFO_MODAL_JOIN_ROOM_FAIL',
	ROOM_INFO_MODAL_JOIN_ROOM_SUCCESSFUL: 'ROOM_INFO_MODAL_JOIN_ROOM_SUCCESSFUL',

	ROOM_CREATE_MODAL_OPEN: 'ROOM_CREATE_MODAL_OPEN',
	ROOM_CREATE_MODAL_CLOSE: 'ROOM_CREATE_MODAL_CLOSE',
	ROOM_CREATE_MODAL_CREATE_START: 'ROOM_CREATE_MODAL_START',
	ROOM_CREATE_MODAL_CREATE_COMPLETE: 'ROOM_CREATE_MODAL_COMPLETE',

	/*---------*----------*------------*/

	HALL_PLAYER_INFO_MODAL_OPEN: 'HALL_PLAYER_INFO_MODAL_OPEN',
	HALL_PLAYER_INFO_MODAL_CLOSE: 'HALL_PLAYER_INFO_MODAL_CLOSE',
	HALL_PLAYER_INFO_MODAL_LOAD_DATA_START: 'HALL_PLAYER_INFO_MODAL_LOAD_DATA_START',
	HALL_PLAYER_INFO_MODAL_LOAD_DATA_FAIL: 'HALL_PLAYER_INFO_MODAL_LOAD_DATA_FAIL',
	HALL_PLAYER_INFO_MODAL_LOAD_DATA: 'HALL_PLAYER_INFO_MODAL_LOAD_DATA',
	HALL_PLAYER_INFO_MODAL_LOAD_DATA_SUCCESS: 'HALL_PLAYER_INFO_MODAL_LOAD_DATA_SUCCESS',

	HALL_RECEIVE_NEW_MESSAGE: 'HALL_RECEIVE_NEW_MESSAGE',
	HALL_NEW_MEMBER: 'HALL_NEW_MEMBER',
	HALL_EXIT_MEMBER: 'HALL_EXIT_MEMBER',
	HALL_LOAD_DATA_START: 'HALL_LOAD_DATA_START',
	HALL_LOAD_DATA_SUCCESSFUL: 'HALL_LOAD_DATA_SUCCESSFUL',
	HALL_LOAD_DATA_FAIL: 'HALL_LOAD_DATA_FAIL',


	/*---------*----------*------------*/

	GAME_LOAD_DATA_START: 'GAME_LOAD_DATA_START',
	GAME_LOAD_DATA_SUCCESSFUL: 'GAME_LOAD_DATA_SUCCESSFUL',
	GAME_LOAD_DATA_FAIL: 'GAME_LOAD_DATA_FAIL',
	GAME_NEW_PLAYED_CARD: 'GAME_NEW_PLAYED_CARD',
	GAME_PLAY_CARD_START: 'GAME_PLAY_CARD_START',
	GAME_PLAY_CARD_FINISH: 'GAME_PLAY_CARD_FINISH',
	GAME_USED_CARD: 'GAME_USED_CARD',
	GAME_LOAD_BOT_DATA: 'GAME_LOAD_BOT_DATA',
	GAME_SELECT_CARD: 'GAME_SELECT_CARD',
	
	GAME_OPEN_CHAT: 'GAME_OPEN_CHAT',
	GAME_CLOSE_CHAT: 'GAME_CLOSE_CHAT'
};

export default MenuActionTypes;