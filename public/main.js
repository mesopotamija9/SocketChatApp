$(function(){
    var socket = io();

    function updateScroll(){
        var element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight;
    }
    

    $("#usernameForm").submit(function(e){
        e.preventDefault();

        $("#default").hide();
        $("#chatApp").css({display: "block"});

        socket.emit("enter username", $("#username").val());
        $("#username").val("");
    });

    $("#chatForm").submit(function(e){
        e.preventDefault();

        socket.emit("chat message", $("#message").val());
        $("#message").val("");
    });
      

    
    socket.on("chat message", function(data){
        $("#chat").append("<li class='chatMessage'>" + "<strong><span class='usernameMessage'>" + data.username + "</span></strong>" + " " + data.msg + "</li>");
        updateScroll();
    });

    socket.on("enter username", function(data){
        $("#chat").append("<li class='chatMessage DisConnectMessage'>" + "<strong>" + data.username + " connected" + "</strong></li>");

        $("#onlineUsers").empty();
        $("#onlineUsers").append("<li id='onlineUsersCount'>Online Users: " + data.connectedUsers + "</li>");
        for(var i = 0; i < data.users.length; i++) {
            $("#onlineUsers").append($("<li>").text(data.users[i]));
        }
        
        $("#chat").css({background: "none"});
        updateScroll();
    });

    socket.on("user disconnected", function(data){
        $("#chat").append("<li class='chatMessage DisConnectMessage'>" + "<strong>" + data.username + " disconnected" + "</strong></li>");

        $("#onlineUsers").empty();
        $("#onlineUsers").append("<li id='onlineUsersCount'>Online Users: " + data.connectedUsers + "</li>");
        for(var i = 0; i < data.users.length; i++) {
            $("#onlineUsers").append($("<li>").text(data.users[i]));
        }
        updateScroll();
    });
});