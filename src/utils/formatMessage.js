module.exports = (playerName, text) => {
  return {
    playerName,
    text,
    createdAt: new DataTransfer().getTime(),
  }
}