/*
	Threat events about
	the Hall room.
	The Hall room is room where
    the players can wait for more
    players join to the room 
    to start the game
*/
const Messages = require("./Messages");
const {Room} = require("./DatabaseConnection");
const BOT_NAMES = ["Zed Bot", 
    "Trickster Bot", "Annie Bot", 
    "Caitlyn Bot", "Quinn Bot", "Jinx Bot"]; 

/* Check if a player can join to the room */
module.exports.joinRoomCheck = function(socket) {
    socket.on("/hall/join-room/check", async data => {
        try
        {
            const room = await Room.findOne({name: data.room});
            if(room === undefined || room === null)
                return socket.emit("/hall/join-room/check/fail", 
                    "Esta sala não existe.");

            const player = room.players.find(a => a.socketId === socket.id);
            if(player === undefined || player === undefined)
                return socket.emit("/hall/join-room/check/fail", 
                    "Você não tem permissão para acessar esta sala.");
            
            if(room.players.length - 1 === room.capacity)
                return socket.emit("/hall/join-room/check/fail", 
                    "Esta sala esta lotada :(");
            
            socket.join(room.name);

            socket.emit("/hall/join-room/check/successful", {
                room
            });

            socket.nsp.to(room.name).emit("/hall/new-member", {
                player,
                full: room.players.length >= room.capacity,
                message: Messages.NewPlayer(
                    player.name, 
                    room.capacity - room.players.length
                )
            });

            socket.emit("/hall/welcome-message", {
                message: Messages.Welcome(
                    player.name, 
                    room.name, 
                    room.admin.name,
                    room.capacity,
                    room.players.length
                )
            });
            socket.broadcast.to("__HOME").emit("/home/load-all-rooms", await Room.find({}));
        }catch(err){
            console.log(err);
        }
    });
}


/* Sending a message to all people in the chat room */
module.exports.newMessage = function(socket) {
    socket.on("/hall/new-message", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            const room = await Room.findOne({name: roomName});
            data.from.name = room.players.find(a => a.socketId === socket.id).name;
            socket.nsp.to(data.room).emit("/hall/new-message", data);
        }catch(err){
            console.log(err);
        }
    });
}


/* Disconnect from hall */
module.exports.exit = function(socket) {
    socket.on("/hall/exit", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            if(roomName)
            {
                console.log("\n\nUser disconnected from: "+roomName);
                const room = await Room.findOne({name: roomName});
                const player = room.players.find(a => a.socketId === socket.id);
                player.remove();
                if(room.players.length === 0 || 
                    room.players.filter(a => a.name !== player.name).every(a => a.isBot)) 
                   await room.remove();
                else
                    await room.save();
                socket.broadcast.to(roomName).emit("/hall/exit-member", {
                    message: {
                        from: {id: "THE DOCTOR", name: "SYSTEM"},
                        text: `${player.name} saiu da sala.`
                    },
                    playerId: player.socketId
                });
                socket.leave(roomName);

                if(!data)
                    socket.emit("/hall/exit");
                socket.broadcast.to("__HOME").emit("/home/load-all-rooms", await Room.find({}));
            }
        }catch(err){
            console.log(err);
        }
    });
}


/* Add bot */
module.exports.addBot = function(socket) {
    socket.on("/hall/add-bot", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            const room = await Room.findOne({name: roomName});
            if(room)
            {
                const bots = room.players.filter(a => a.isBot);
                const avaliableNames = BOT_NAMES.map((value, index) => {
                    if(!bots.find(a => a.name === value))
                        return {value, index};
                }).filter(a => a).shift();
                const newBot = {
                    socketId: "bot-"+avaliableNames.index+1,
                    name: avaliableNames.value,
                    connectedSince: new Date().getTime(),
                    roomName: room.name,
                    isBot: true
                };
                room.players.push(newBot);
                if(room.players.length === room.capcity)
                    room.status = "IN GAME";
                await room.save();
                socket.nsp.to(room.name).emit("/hall/new-member", {
                    player: newBot,
                    full: room.players.length >= room.capacity,
                    message: Messages.NewBot(newBot.name, room.capacity - room.players.length)
                });
                socket.emit("/hall/add-bot-success", {});
                socket.broadcast.to("__HOME").emit("/home/load-all-rooms", await Room.find({}));
            }
            else
            {
                socket.emit("/hall/add-bot-fail", {
                    player: undefined, message: "Something went wrong!"
                });
            }
        }catch(err){
            console.log(err);
        }
    });
}


/* Remove bot */
module.exports.removeBot = function(socket) {
    socket.on("/hall/remove-bot", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            if(roomName)
            {
                console.log("\n\nBot has been disconnected from: "+roomName);
                const room = await Room.findOne({name: roomName});
                const player = room.players.find(a => a.isBot && a.name === data);
                player.remove();
                await room.save();
                socket.nsp.to(roomName).emit("/hall/exit-member", {
                    message: {
                        from: {id: "THE DOCTOR", name: "SYSTEM"},
                        text: `${room.admin.name} removeu o bot ${player.name} da sala.`
                    },
                    playerId: player.socketId
                });
                socket.emit("/hall/remove-bot-success", {});
                socket.broadcast.to("__HOME").emit("/home/load-all-rooms", await Room.find({}));
            }
        }catch(err){
            console.log(err);
        }
    });
}
