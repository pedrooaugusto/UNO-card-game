const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const HallEvents = require("./SocketHallEvents");
const HomeEvents = require("./SocketHomeEvents");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http).of("/app");


app.set("port", (process.env.PORT || 3001));
app.set("view engine", "ejs");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended: true}));

app.use(session({
    secret: "keyboard cat", 
    cookie: {maxAge: 3600000 },
    resave: false, 
    saveUninitialized: false
}));

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket){
    /*
        WE HAVE TO THREAT WHEN USER DISCONNECT
    */
    HomeEvents(socket);
    HallEvents(socket);
});

http.listen(app.get("port"), function () {
    console.log("Rodando na porta "+ app.get("port"));
});