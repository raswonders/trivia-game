const { data } = require("cheerio/lib/api/attributes");

const players = [];

const addPlayer = ({ id, playerName, room }) => {
  if (!playerName || !room) {
    return {
      error: new Error("Please enter a player name and room"),
    };
  }

  // clean data
  for (data of [playerName, room]) {
    data = data.trim().toLowerCase();
  }

  const existingPlayer = players.find((player) => {
    return player.room === room && player.playerName === playerName;
  });

  if (existingPlayer) {
    return {
      error: new Error("Player name already in use!"),
    };
  }

  const newPlayer = { id, playerName, room };
  players.push(newPlayer);

  return { newPlayer };
}

const getPlayer = (id) => {
  const player = players.find((player) => player.id === id);

  if (!player) {
    return {
      error: new Error("Player not found!")
    };
  }

  return { player };
};

const getAllPlayers = (room) => {
  return players.filter((player) => player.room === room);
};

const removePlayer(id) => {
  return players.find((player, index) => {
    if (player.id === id) {
      return players.splice(index, i)[0];
    }
    return false;
  });
};

// Export helper methods
module.exports = {
  addPlayer,
  getPlayer,
  getAllPlayers,
  removePlayer,
};