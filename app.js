var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = process.env.PORT || 3000;
var io = require("socket.io")(server);

app.use(express.static("public"));


io.on("connection", function(socket) {
    console.log("User Connected");

    io.emit("user connected", "User Connected");
    

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on("disconnect", function(){
        console.log("User Disconnected");
        io.emit("user disconnected", "User Disconnected");
    });
});



server.listen(port, function(){
    console.log("Listening on port " + port + "...");
});