require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const request = require('./utils/request');
const port = 8081;

app.use(express.static('dist'));

app.get('/test', (req, res) => {
  request.get('sul0jd1ro0.execute-api.us-east-1.amazonaws.com', '/prod/testing')
    .then(response => res.json(response))
    .catch((err) => {
      res.status(500).send('Internal server error');
      console.error(err);
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
