import App from '../App';
import {Container} from 'flux/utils';
import CreateRoomStoreAction from '../data/CreateRoomStoreAction';
import RoomListStoreAction from '../data/RoomListStoreAction';
import RoomInfoModalStoreAction from '../data/RoomInfoModalStoreAction';
import HallStoreAction from '../data/HallStoreAction';
import HallPlayerInfoStoreAction from '../data/HallPlayerInfoStoreAction';
import socket from '../data/DefaultSocket';

function getStores () 
{
	return [
		RoomListStoreAction,
		RoomInfoModalStoreAction,
		CreateRoomStoreAction,
		HallStoreAction,
		HallPlayerInfoStoreAction
	];
}
function getState () 
{
	return {
		roomsList: RoomListStoreAction.getProps(),
		roomInfo: RoomInfoModalStoreAction.getProps(),
		createRoom: CreateRoomStoreAction.getProps(),
		
		playerInfo: HallPlayerInfoStoreAction.getProps(),
		hall: 		HallStoreAction.getProps(),
		
		socketID:   socket.getSocket().id//"FDGUH8Y8yg7t7t67t7G76f7t7tGyf65r6yohit6u"
	};
}
export default Container.createFunctional(App, getStores, getState);