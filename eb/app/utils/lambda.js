const request = require('./request');

function addSong(sessionName, songId) {
  const url = `/prod/add_song?session=${sessionName}&song=${songId}`;
  return request.post(process.env.LAMBDA_HOST, url);
}

function getSongQueue(sessionName) {
  const url = `/prod/get_song_queue?session=${sessionName}`;
  return request.get(process.env.LAMBDA_HOST, url);
}

function deleteSession(sessionName) {
  const url = `/prod/delete_session?session=${sessionName}`;
  return request.delete(process.env.LAMBDA_HOST, url);
}

function deleteSong(sessionName) {
  const url = `/prod/delete_song?session=${sessionName}`;
  return request.delete(process.env.LAMBDA_HOST, url);
}

module.exports = {
  addSong, getSongQueue, deleteSession, deleteSong
};
