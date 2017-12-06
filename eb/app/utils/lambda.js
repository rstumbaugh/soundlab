const { get, post } = require('./request');

function addSongRequest(sessionName, songId, isDj) {
  const url = `/prod/add_song_request?session=${sessionName}&song=${songId}&dj=${isDj}`;
  post(process.env.LAMBDA_HOST, url)
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

module.exports = {
  addSongRequest
};
