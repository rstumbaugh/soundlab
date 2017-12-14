const request = require('request');

// not secret, can just be grabbed from SoundCloud's website on any track page
const clientId = 'yz7hDTb7GMHkmzo3CrZKSyvIwXaPF7wL';

function getTrackInfo(soundcloudUrl) {
  return new Promise((resolve, reject) => {
    const url = 'http://api.soundcloud.com/resolve' +
      `?url=${encodeURIComponent(soundcloudUrl)}` +
      `&client_id=${clientId}`;
      
    request.get(url, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(JSON.parse(body));
    });
  });
}

module.exports = {
  getTrackInfo
};
