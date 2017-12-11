const https = require('https');
const http = require('http');
const aws4 = require('aws4');

const request = (host, path, method) => {
  let req = https;
  const options = {
    host,
    path,
    method,
  };

  if (host === 'localhost') {
    options.port = '5000';
    req = http;
  }

  const signedRequest = aws4.sign(options, {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });

  signedRequest.headers['content-type'] = 'application/json';

  return new Promise((resolve, reject) => {
    req.get(signedRequest, (response) => {
      response.on('data', (d) => {
        try {
          resolve(JSON.parse(d));
        } catch (e) {
          reject(e);
        }
      });
      response.on('error', e => reject(e));
    }).end();
  });
};

module.exports = {
  get: (host, path) => request(host, path, 'GET'),
  post: (host, path) => request(host, path, 'POST'),
  delete: (host, path) => request(host, path, 'DELETE')
};
