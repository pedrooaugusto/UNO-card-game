import App from '../App.jsx';
import {Container} from 'flux/utils';
import CommonMenuStore from '../data/CommonMenuStore';
import RoomListAction from '../data/RoomListAction';
import RoomInfoAction from '../data/RoomInfoAction';
import CreateRoomAction from '../data/CreateRoomAction';
import CommonHallStore from '../data/CommonHallStore';
import CommonGameStore from '../data/CommonGameStore';
import HallAction from '../data/HallAction';
import GameAction from '../data/GameAction';
import socket from '../data/DefaultSocket';

function getStores () 
{
	return [
		CommonMenuStore,
		CommonHallStore,
		CommonGameStore
	];
}
function getState () 
{
	return {
		menu:{
			state: CommonMenuStore.getState(),
			roomList: RoomListAction.getActions(),
			roomInfo: RoomInfoAction.getActions(),
			createRoom: CreateRoomAction.getActions(),
			socketID:   socket.getSocket().id
		},
		hall:{
			state: CommonHallStore.getState(),
			...HallAction.getActions(),
			socketID: socket.getSocket().id
		},
		game: {
			state: CommonGameStore.getState(),
			...GameAction.getActions(),
			socketID: socket.getSocket().id
		}
	};
}
export default Container.createFunctional(App, getStores, getState);