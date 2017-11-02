import Immutable from 'immutable';

const Room = Immutable.Record({
	name: 'Nerd For Speed',
	status: 'IN GAME',
	admin: '',
    numberOfPlayers: 0,
	players: []
});
const Create = data => {
	return new Room({
		id: data.id,
		name: data.name,
		status: data.status,
		capacity: data.capacity,
		playersNumber: data.playersNumber,
		players: []
	});
};
export default {
	Create,
	Room
}