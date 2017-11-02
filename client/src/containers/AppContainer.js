import App from '../App';
import {Container} from 'flux/utils';
import CreateRoomStoreAction from '../data/CreateRoomStoreAction';
import RoomListStoreAction from '../data/RoomListStoreAction';
import RoomInfoModalStoreAction from '../data/RoomInfoModalStoreAction';
import HallStoreAction from '../data/HallStoreAction';
import socket from '../data/DefaultSocket';

function getStores () {
	return [RoomListStoreAction, RoomInfoModalStoreAction, CreateRoomStoreAction, HallStoreAction];
}
function getState () 
{
	return {
		roomsList: RoomListStoreAction.getProps(),
		roomInfo: RoomInfoModalStoreAction.getProps(),
		createRoom: CreateRoomStoreAction.getProps(),
		hall: 		HallStoreAction.getProps(),
		socketID:   socket.getSocket().id,
	};
}
export default Container.createFunctional(App, getStores, getState);