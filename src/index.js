const formatMessage = require("./utils/formatMessage");

const {
  addPlayer,
  getAllPlayers,
  getPlayer,
  removePlayer,
} = require("./utils/players");

const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require('socket.io');

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app); // create HTTP server using app
const io = socketio(server); // connect Socket.IO to server

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection', () => {
  console.log('A new player just connected');
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});