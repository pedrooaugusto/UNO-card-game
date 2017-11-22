import openSocket from 'socket.io-client';

//http://127.0.0.1:3001
const socket = openSocket("/app");

function getSocket(){return socket;}

export default {getSocket}