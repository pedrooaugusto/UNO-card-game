/* Temporary database */


/* User collection */
let users = [
    {
        id: "FDGUH8Y8yg7t7t67t7G76f7t7tGyf65r6yohit6u",
        name: "Pedro Augusto",
        room: "Nerd For Speed",
        connectedSince: 1510491855653,
        isBot: false
    },
    {
        id: "HIYH8Y9ih978tfgUFYFg87gg7FYFY6Ff6fF66YF66",
        name: "Felipe Freitas",
        room: "Nerd For Speed",
        connectedSince: 1510491851653,
        isBot: false
    },
    {
        id: "H8y7tgbyf5f6uug87g78t8UGUTDTUHIUfyfygu7ft",
        name: "Alex Guarany",
        room: "Nerd For Speed",
        connectedSince: 1510491855643,
        isBot: false
    },
    {
        id: "jy87y7tgbUT7TGF6R6RF7R6R65R67t6ftfrf7rr6R",
        name: "Paulo Torrens",
        room: "APDA",
        connectedSince: 1510491155653,
        isBot: false
    },
    {
        id: "hugtg7Y67TF5V8DIIHIYJU87FDRf67t76t76f6ei8",
        name: "Haskell Camargo",
        room: "APDA",
        connectedSince: 1510491855640,
        isBot: false
    },
    {
        id: "FDGUH8gfgIUHIHUGugyguyF7t7tGyf65r6yohit6u",
        name: "Cirilo",
        room: "Carrosel",
        connectedSince: 1510491855653,
        isBot: false
    },
    {
        id: "FGFOIJOihuhuhUGUYGUGguyF7t7tGyf65r6yohit6u",
        name: "Maria Joaquina",
        room: "Carrosel",
        connectedSince: 1510491855613,
        isBot: false
    }
];


let rooms = [
    {
        name: "Nerd For Speed",
        status: "WAITING",
        capacity: 5,
        numberOfPlayers: 3,
        admin: "FDGUH8Y8yg7t7t67t7G76f7t7tGyf65r6yohit6u"
    },
    {
        name: "APDA",
        status: "WAITING",
        capacity: 3,
        numberOfPlayers: 2,
        admin: "jy87y7tgbUT7TGF6R6RF7R6R65R67t6ftfrf7rr6R"
    },
    {
        name: "Carrosel",
        status: "IN GAME",
        capacity: 2,
        numberOfPlayers: 2,
        admin: "FDGUH8gfgIUHIHUGugyguyF7t7tGyf65r6yohit6u"
    }
];


/* Creates a new in the database */
const insertUser = function (user){
    users.push({
        id: user.id,
        name: user.name || "",
        room: user.room,
        connectedSince: user.connectedSince || 0,
        isBot: user.isBot || false
    });
    // console.log('\n\nInsert\n')
    // for(let x of users)
    //     console.log(x.id);
}

/* Remove user */
const removeUser = function (idUser){
    users = users.filter(a => a.id !== idUser);
    //console.log('\n\nRemove\n');
    /*for(let x of users)
        console.log(x.id);*/
}

/* Creates a new home */
const insertRoom = function (room, admin){
    rooms.push({
        name: room.name,
        status: "WAITING",
        capacity: room.capacity,
        numberOfPlayers: 0,
        admin
    });
}
const removeRoom = function (nameRoom){
    rooms = rooms.filter(a => a.name !== nameRoom);
}
const findUser = function (cond){
    return users.find(cond);
}
const findRoom = function (cond){
    return rooms.find(cond);
}
const filterUser = function (cond){
    return users.filter(cond);
}
const getRooms = () => rooms;

module.exports = {
    insertRoom,
    removeRoom,
    removeUser,
    insertUser,
    findUser,
    findRoom,
    filterUser,
    getRooms,
    users,
    rooms
}