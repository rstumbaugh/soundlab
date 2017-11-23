const https = require('https');
const aws4 = require('aws4');

module.exports = {
  get: (host, path) => {
    const options = {
      host, path
    };

    const request = aws4.sign(options, {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });

    return new Promise((resolve, reject) => {
      https.request(request, (response) => {
        response.on('data', d => resolve(JSON.parse(d)));
        response.on('error', e => reject(e));
      }).end();
    });
  }
};
