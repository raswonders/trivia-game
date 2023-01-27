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

io.on('connection', (socket) => {
  console.log('A new player just connected');

  socket.on('join', ({ playerName, room }, callback) => {
    const { error, newPlayer } = addPlayer({ id: socket.id, playerName, room });

    if (error) return callback(error.message);
    callback();

    socket.join(newPlayer.room);

    socket.emit('message', formatMessage('Admin', 'Welcome!'));

    socket.broadcast
      .to(newPlayer.room)
      .emit(
        'message',
        formatMessage('Admin', `${newPlayer.playerName} has joined the game!`)
      );

      io.in(newPlayer.room).emit('room', {
        room: newPlayer.room,
        players: getAllPlayers(newPlayer.room),
      });
  });

  socket.on("disconnect", () => {
    console.log("A player disconnected");

    const disconnectedPlayer = removePlayer(socket.id);

    if (disconnectedPlayer) {
      const { playerName, room } = disconnectedPlayer;
      io.in(room).emit(
        "message",
        formatMessage("Admin", `${playerName} has left!`)
      );

      io.in(room).emit("room", {
        room,
        players: getAllPlayers(room),
      });
    }
  })
});



server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});