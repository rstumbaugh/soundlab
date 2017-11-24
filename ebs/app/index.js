require('dotenv').config();
const express = require('express');
const path = require('path');
const request = require('./utils/request');
const app = express();
const port = 8081;

app.use(express.static('dist'));

app.get('/test', (req, res) => {
  request.get(process.env.LAMBDA_HOST, '/prod/get_song_queue')
    .then(response => res.json(response))
    .catch((err) => {
      res.status(500).send('Internal server error');
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return;
  }

  console.log(`listening on ${port}`);
});
