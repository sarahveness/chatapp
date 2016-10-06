const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// const path = require('path');

// Set the port to 4000
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

  wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
      console.log("sending to client")
      client.send(data);
    });
  };

wss.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message, username) => {
    const parseMessage = JSON.parse(message);
    console.log(parseMessage);
    console.log("User " + parseMessage.username + " said " + parseMessage.message);

    var newMessage = {};

    if (parseMessage.type === "postMessage") {
      newMessage = {
        type: "incomingMessage",
        id: uuid.v1(),
        username: parseMessage.username,
        message: parseMessage.message
      };
    }

    if (parseMessage.type === "postNotification") {
      newMessage = {
        type: "incomingNotification",
        id: uuid.v1(),
        message: parseMessage.message
      };
    }

      wss.broadcast(JSON.stringify(newMessage));
  });

  socket.on('close', () => {
  console.log('Client disconnected');
  });
});