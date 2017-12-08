const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// PROD: (???) hj não, bb
// DEV:  mongodb://localhost:27017/uno
const connection = mongoose.connect('mongodb://localhost:27017/uno', {
	useMongoClient: true
});

mongoose.connection.on('error', function(err){
	console.log('Database connection error');
});

const Schema = mongoose.Schema;


const playerSchema = new Schema({
	socketId: String,
	name: String,
	connectedSince: Number,
	roomName: String,
	isBot: Boolean
});


const roomSchema = new Schema({
	name: String,
	status: String,
	capacity: Number,
	playerTurn: Number,
	admin: playerSchema,
	cards: [String],
	players: [playerSchema],
});

const Room = mongoose.model("room", roomSchema);
module.exports.Room = Room;