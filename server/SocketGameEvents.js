
const {Room} = require("./DatabaseConnection");
const {cardNames} = require("./Cartas");
const NUM_CARDS = 7;

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
            const adminId = room.admin.socketId;
            for (let i = 0; i < room.players.length; i++)
            {
                if(!room.players[i].isBot)
                    socket.nsp.to(room.players[i].socketId).emit("/game/request-cards", {
                        room,
                        myIndex: i,
                        admin: room.players[i].socketId === adminId,
                        usedCards: bara.usedCards,
                        playersCards: new Array(room.players.length).fill(NUM_CARDS),
                        unUsedCards: bara.unUsedCards,
                        yourCards: bara.yourCards[i],
                        feedback: ["_NAME_ has _TIME_ to make _VERB_ move"]
                    });
                else
                    socket.nsp.to(room.admin.socketId).emit("/game/request-cards--bot", {
                        name: room.players[i].name,
                        myIndex: i,
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
            data.ctx.previousPlayer = {
                index: data.ctx.currentPlayerIndex,
                value: -data.card.length
            };
            for (let i = 0; i < data.card.length; i++)
            {
                const card = data.card[i];
                if(i === 0 || card.name.includes("turn") || card.name.includes("block") || card.name.includes("buy"))
                {
                    
                    let values = evaluateCard(card, data.ctx);
                    data.ctx.nextPlayerIndex = values.nextPlayerIndex;
                    data.ctx.direction = values.direction;
                    data.ctx.feedback = values.feedback;
                    data.ctx.howMany = values.howMany;
                }
            }
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

module.exports.newMessage = function(socket) {
    socket.on("/game/new-message", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            socket.nsp.to(data.room).emit("/game/new-message", data);
        }catch(err){
            console.log(err);
        }
    });
}

module.exports.buyCard = function(socket) {
    socket.on("/game/buy-card", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            data.previousPlayer = {
                index: data.currentPlayerIndex,
                value: 1
            };
            if(data.needToBuy > 1)
            {
                data.nextPlayerIndex = data.currentPlayerIndex;
                data.feedback = "_NAME_ has _TIME_ to buy _HOWMANY_ cards";
                socket.nsp.to(roomName).emit("/game/buy-card", {
                    from: socket.id,
                    ctx: data
                });
            }
            else
            {
                const values = evaluateCard({name: "buy"}, data);
                data.nextPlayerIndex = values.nextPlayerIndex;
                data.direction = values.direction;
                data.feedback = values.feedback;
                socket.nsp.to(roomName).emit("/game/buy-card", {
                    from: socket.id,
                    ctx: data
                });
            }
        }catch(err){
            console.log(err);
        }
    });
}


module.exports.timeouted = function(socket) {
    socket.on("/game/timeouted", async data => {
        try
        {
            const roomName = Object.values(socket.rooms)[1];
            data.previousPlayer = {
                index: data.currentPlayerIndex,
                value: 0
            };
            const values = evaluateCard({name: "buy"}, data);
            data.nextPlayerIndex = values.nextPlayerIndex;
            data.direction = values.direction;
            data.feedback = (data.pass ? "The last player dit not make his move :(. " : "")+values.feedback;
            socket.nsp.to(roomName).emit("/game/timeouted", {
                from: socket.id,
                ctx: data
            });
        }catch(err){
            console.log(err);
        }
    });
}

/* Evaluate one card and return the next player and the feedback */
function evaluateCard(card, {direction, capacity, currentPlayerIndex, howMany = 0}, l = false) {
    let nextPlayerIndex;
    if(card.name.includes("block"))
    {
        nextPlayerIndex = currentPlayerIndex + 2*direction;
    }
    else if(card.name.includes("turn"))
    {
        direction *= -1;
        nextPlayerIndex = currentPlayerIndex + (capacity === 2 ? 2 : 1 ) * direction;
    }
    else if(!l)
    {
        nextPlayerIndex = currentPlayerIndex + direction;  
    }
    if(card.name.includes("buy-two"))
    {
        howMany += 2;
    }
    else if(card.name === "buy-four")
    {
        howMany += 4;
    }
    nextPlayerIndex = checkBounds(nextPlayerIndex, capacity);
    let feedback = feedbackCard(card);
    return {
        direction,
        nextPlayerIndex,
        feedback,
        howMany
    }
}

/* evaluates a card and return a message */
function feedbackCard(card) {
    if(card.name.includes("buy-two"))
        return "_NAME_ has _TIME_ to buy _HOWMANY_ cards";
    else if(card.name === "buy-four")
        return "_NAME_ has _TIME_ to buy _HOWMANY_ cards";
    else
        return "_NAME_ has _TIME_ to make _VERB_ move";
}

/* check bounds for the next player */
function checkBounds (nextPlayerIndex, capacity) {
    if(nextPlayerIndex === capacity)
        return 0;
    else if(nextPlayerIndex > capacity)
        return nextPlayerIndex - capacity;
    else if(nextPlayerIndex < 0)
        return capacity + nextPlayerIndex;
    else
        return nextPlayerIndex;
}

/* Distribui as cartas */
function gerarBaralho(n)
{
    let unUsedCards = [];
    const yourCards = [];
    const arr = Array.from(cardNames);
    shuffleArray(arr);
    let k = 0;
    for (let i = 0; i < n; i++) 
    {
        yourCards.push(arr.slice(k, k+NUM_CARDS).map((v, i) => ({
            id: (i+1),
            name: v,
            isSelected: false,
            used: false
        })));
        k+=NUM_CARDS;
    }
    unUsedCards = arr.slice(k, arr.length-1);
    let c = unUsedCards[0], i = 0;
    while(c.match(/buy|color|turn|block/))
    {
        i+=1;
        c = unUsedCards[i];
    }
    unUsedCards.splice(i, i);
    const usedCards = [{
        id: Math.floor(Math.random()*10000),
        name: c,
        from: "-1",
        rotate: ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6))
    }];
    return {unUsedCards, yourCards, usedCards}
}

/* Embaralha o array */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}