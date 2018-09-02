var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var users = [];
var connectedUsers = 0;

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket){
    connectedUsers += 1;
    console.log("Connected: " + connectedUsers);

    socket.on("enter username", function(data){
        socket.username = data;

        users.push(socket.username);
        io.emit("enter username", {username: data, users: users, connectedUsers: connectedUsers});
    });

    socket.on("chat message", function(data){
        io.emit("chat message", {msg : data, username: socket.username});
    });

    socket.on("disconnect", function(){
        connectedUsers -= 1;
        users.splice(users.indexOf(socket.username), 1);

        io.emit("user disconnected", {username: socket.username, users: users, connectedUsers: connectedUsers});

        console.log("Connected: " + connectedUsers);
    });
});


server.listen(process.env.PORT || 3000, function(){
    console.log("Listening on port 3000...");
});
