const https = require('https');
const http = require('http');
const aws4 = require('aws4');

module.exports = {
  get: (host, path) => {
    let request = https;
    const options = {
      host,
      path,
    };

    if (host === 'localhost') {
      options.port = '3000';
      request = http;
    }

    const signedRequest = aws4.sign(options, {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });

    console.log(signedRequest);

    return new Promise((resolve, reject) => {
      request.get(signedRequest, (response) => {
        response.on('data', d => resolve(JSON.parse(d)));
        response.on('error', e => reject(e));
      }).end();
    });
  }
};
