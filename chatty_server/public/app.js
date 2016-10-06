$(document).ready(function() {

  var socket = new WebSocket("ws://localhost:8080");

  socket.onopen = function(event) {
    console.log("Connected to websocket server");
  }
})

