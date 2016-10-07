const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const PORT = 3001;

const util = require('util');
const inspect = (o, d) => console.log(util.inspect(o, {colors: true, depth: d || 1}));

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    console.log("sending to client")
    client.send(data);
  });
};

function sendClientCount() {
  wss.broadcast(JSON.stringify({
    type: 'clientCount',
    count: wss.clients.length
  }));
}

wss.on('connection', (socket) => {
  sendClientCount();
  socket.on('message', (message, username) => {
    const parseMessage = JSON.parse(message);
    // console.log(parseMessage);
    // console.log("User " + parseMessage.username + " said " + parseMessage.message);

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
    sendClientCount();
  });
});