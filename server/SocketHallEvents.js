/*
	Threat events about
	the Hall room.
	The Hall room is room where
    the players can wait for more
    players join to the room 
    to start the game
*/
const database = require("./database");

module.exports = function(socket){
    
    /* Check if a player can join to the room */
    socket.on("/hall/join-room/check", data => {
        
        const room = database.rooms.find(a => a.name === data.room);
        if(room === undefined)
            return socket.emit("/hall/join-room/check/fail", 
                "Esta sala não existe.");

        const player = database.users.find(a => a.id === socket.id && a.room === data.room);
        if(player === undefined)
            return socket.emit("/hall/join-room/check/fail", 
                "Você não tem permissão para acessar esta sala.");
        
        if(room.status === "IN GAME")
            return socket.emit("/hall/join-room/check/fail", 
                "Esta sala esta lotada :(");
        
        socket.join(room.name);
        room.numberOfPlayers += 1;
        if(database.users.filter(a => a.room === room.name).length === room.capcity)
            room.status = "IN GAME";

        socket.emit("/hall/join-room/check/successful", {
            room,
            players: database.users.filter(a => a.room === room.name)
        });
        socket.nsp.to(room.name).emit("/hall/welcome-message", {
            player,
            message:{
                from: {id: "THE DOCTOR", name: "SYSTEM"},
                time: new Date().toLocaleString("bali"),
                text: `${player.name} entrou na sala.`
            }
        });
        socket.broadcast.to("home").emit("/home/load-all-rooms", database.rooms);
    });


    /* Sending a message to all people in the chat room */
    socket.on("/hall/new-message", data => {
        data.from.name = database.users.find(a => a.id === socket.id).name;
        socket.nsp.to(data.room).emit("/hall/new-message", data);
    });

    /* Sending info a about the player */
    socket.on("/hall/load-info-player", data => {
        const room = Object.values(socket.rooms)[1];
        const p = database.users.find(a => a.name === data);
        if(p)
            return socket.nsp.to(room).emit("/hall/load-info-player-success", {
                player: p, message: "Ok"
            });
        return socket.nsp.to(room).emit("/hall/load-info-player-fail", {
            player: undefined, message: "Ocorreu um erro..."
        });
    });
};