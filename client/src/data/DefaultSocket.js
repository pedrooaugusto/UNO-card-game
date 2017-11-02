import openSocket from 'socket.io-client';

const socket = openSocket("http://127.0.0.1:3001/app");
//eslint-disable-next-line
let room;

function getSocket(){return socket;}

function setRoom (room) {this.room = room;}

function getRoom(){return this.room;}

export default {getSocket, setRoom, getRoom}