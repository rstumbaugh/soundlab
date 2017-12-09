const { get, post } = require('./request');

function addSongRequest(sessionName, songId) {
  const url = `/prod/add_song?session=${sessionName}&song=${songId}`;
  return post(process.env.LAMBDA_HOST, url);
}

module.exports = {
  addSongRequest
};
