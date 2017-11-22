import App from '../App';
import {Container} from 'flux/utils';
import CommonMenuStore from '../data/CommonMenuStore';
import RoomListAction from '../data/RoomListAction';
import RoomInfoAction from '../data/RoomInfoAction';
import CreateRoomAction from '../data/CreateRoomAction';
import CommonHallStore from '../data/CommonHallStore';
import HallAction from '../data/HallAction';
import socket from '../data/DefaultSocket';

function getStores () 
{
	return [
		CommonMenuStore,
		CommonHallStore
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
		}
	};
}
export default Container.createFunctional(App, getStores, getState);