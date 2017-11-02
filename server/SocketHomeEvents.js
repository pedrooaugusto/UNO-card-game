/*
	Threat events about
	the home room.
	The home room is room where
	everyone joins as soon they
	access the application.
*/
const database = require("./database");

module.exports = function(socket){

    /* When disconnectingo from the room */
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        const user = database.users.find(a => a.id === socket.id);
        if(user && user.room && user.room !== "home"){
            database.rooms.find(a => a.name === user.room).numberOfPlayers -= 1;
            socket.broadcast.to(user.room).emit("/hall/new-message", {
                from: {id: "THE DOCTOR", name: "SYSTEM"},
                time: new Date().toLocaleString("bali"),
                text: `${user.name} siu da sala.`
            });
            user.room = "ghost"; // \_(O.O)_/ idk...
            socket.broadcast.to("home").emit("/home/load-all-rooms", database.rooms);
        }
    });
	/* Joining to the home room */
	socket.on("/app/join/home", data => {
        console.log(`User ${socket.id} connected`);
        database.insertUser({
        	id: socket.id,
        	room: "home"
       	});
        socket.join("home");
        socket.emit("/app/join/home/success", "home");
    });


    /* Request all rooms created */
    socket.on("/home/load-all-rooms", data => {
        socket.emit("/home/load-all-rooms", database.rooms);
    });

    
    /* Request info of room */
    socket.on("/home/load-room-info", data => {
        const room = database.rooms.find(a => a.name === data);
        const players = database.users.filter(a => a.room === data);
        socket.emit("/home/load-room-info", {room, players});
    });


    /* Attempet to create a new room */
    socket.on("/home/create-room", data => {
        if(database.rooms.find(a => a.name === data.name))
        {
            socket.emit("/home/create-room/fail", {
                created: false,
                message: `Falha ao criar sala, este nome já se encontra em uso.`
            });
        }
        else
        {
        	database.insertRoom(data, socket.id);
            
            const player = database.users.find(a => a.id === socket.id);
            socket.leave("home");
            player.room = data.name;
            player.name = data.nickName;

            socket.broadcast.to("home").emit("/home/load-all-rooms", database.rooms);
            socket.emit("/home/create-room/success", {
                created: true,
                message: 'Sala criada com sucesso!',
                roomName: data.name
            });
        }
    });


    /* Attempt to joining a room */
    socket.on("/home/join-room", data => {
	    const room = database.rooms.find(a => a.name === data.room);

	    if(room.status === "IN GAME")
	        return socket.emit("/home/join-room/fail", "Sala esta esta lotada!");

	    const exist = database.users.find(a => a.room === room.name && a.name === data.nickName)
	    if(exist !== undefined)
	    	return socket.emit("/home/join-room/fail", "Este nickname já existe");
	    const player = database.users.find(a => a.id === socket.id);
	    socket.leave("home");
	    player.room = room.name;
	    player.name = data.nickName;
        room.numberOfPlayers += 1;

	    socket.emit("/hall/join-room/successful", room.name);
	});
};