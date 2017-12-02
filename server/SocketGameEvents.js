
const {Room} = require("./DatabaseConnection");
const cardNames = ["red-turn", "red-one", "red-two", "red-three", "red-four", "red-five", "red-six", "red-seven", "red-eight", "red-nine", "blue-turn", "blue-one", "blue-two", "blue-three", "blue-four", "blue-five", "blue-six", "blue-seven", "blue-eight", "blue-nine", "green-turn", "green-one", "green-two", "green-three", "green-four", "green-five", "green-six", "green-seven", "green-eight", "green-nine", "yellow-turn", "yellow-one", "yellow-two", "yellow-three", "yellow-four", "yellow-five", "yellow-six", "yellow-seven", "yellow-eight", "yellow-nine", "red-buy-two", "blue-buy-two", "green-buy-two", "yellow-buy-two", "red-block", "blue-block", "green-block", "yellow-block", "buy-four", "buy-four", "change-color", "change-color", "red-zero", "blue-zero", "green-zero", "yellow-zero"];

module.exports.startGameCheck = function(socket) {
    socket.on("/game/start/check", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            const room = await Room.findOne({name: roomName});
            if(room === undefined || room === null)
                return socket.emit("/game/start/check/fail", 
                    "Esta sala não existe.");

            const player = room.players.find(a => a.socketId === socket.id);
            if(player === undefined || player === undefined)
                return socket.emit("/game/start/check/fail", 
                    "Você não tem permissão para acessar esta sala.");
            return socket.emit("/game/start/check/successful", {
                isAdmin: room.admin.socketId === socket.id
            });
        }catch(err){
            console.log(err);
        }
    });
}

module.exports.requestCards = function(socket) {
    socket.on("/game/request-cards", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            const room = await Room.findOne({name: roomName});
            const bara = gerarBaralho(room.players.length);
            for (let i = 0; i < room.players.length; i++) {
                if(!room.players[i].isBot)
                    socket.nsp.to(room.players[i].socketId).emit("/game/request-cards", {
                        room,
                        myIndex: i,
                        unUsedCards: bara.unUsedCards,
                        yourCards: bara.yourCards[i],
                        feedback: ["_NAME_ has _TIME_ to make _VERB_ move"]
                    });
                else
                    socket.nsp.to(room.admin.socketId).emit("/game/request-cards--bot", {
                        name: room.players[i].name,
                        yourCards: bara.yourCards[i]
                    });
            }
        }catch(err){
            console.log(err);
        }
    });
}

module.exports.sendCard = function(socket) {
    socket.on("/game/send-card", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            let nextPlayerIndex;
            data.ctx.previousPlayer = {
                index: data.ctx.currentPlayerIndex,
                value: -1
            }
            if(data.card[0].name.includes("block"))
                nextPlayerIndex = data.ctx.currentPlayerIndex + 2*(data.ctx.direction);
            else if(data.card[0].name.includes("turn")){
                data.ctx.direction *= -1;
                if(data.ctx.capacity === 2)
                    nextPlayerIndex = data.ctx.currentPlayerIndex + 2*(data.ctx.direction);
                else
                    nextPlayerIndex = data.ctx.currentPlayerIndex + data.ctx.direction;
            }
            else{
                nextPlayerIndex = data.ctx.currentPlayerIndex + data.ctx.direction;  
            }
            if(nextPlayerIndex === data.ctx.capacity)
                nextPlayerIndex = 0;
            else if(nextPlayerIndex > data.ctx.capacity)
                nextPlayerIndex = nextPlayerIndex - data.ctx.capacity;
            else if(nextPlayerIndex < 0)
                nextPlayerIndex = data.ctx.capacity + nextPlayerIndex;
            data.ctx.nextPlayerIndex = nextPlayerIndex;
            if(data.card[0].name.includes("buy-two"))
                data.ctx.feedback = "_NAME_ has _TIME_ to buy 2 cards";
            else if(data.card[0].name === "buy-four")
                data.ctx.feedback = "_NAME_ has _TIME_ to buy 4 cards";
            else
                data.ctx.feedback = "_NAME_ has _TIME_ to make _VERB_ move";
            data.card[0].from = socket.id;
            socket.nsp.to(roomName).emit("/game/send-card", {
                from: socket.id,
                card: data.card,
                ctx: data.ctx
            });
        }catch(err){
            console.log(err);
        }
    });
}

function gerarBaralho(n){
    const unUsedCards = [];
    const yourCards = [];
    const arr = cardNames.slice();
    shuffleArray(arr);
    let k = 0;
    for (let i = 0; i < n; i++) {
        yourCards.push(arr.slice(k, k+7).map((v, i) => {
            return {
                id: (i+1),
                name: v,
                isSelected: false,
                used: false
            }
        }));
        k+=7;
    }
    unUsedCards.push(arr.slice(k, arr.length-1));
    return{
        unUsedCards,
        yourCards
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}