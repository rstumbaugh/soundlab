require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('./utils/session');
const port = 8081;

session.init(io);
app.use(express.static('dist'));

io.on('connection', (socket) => {
  socket.on('join session', (sessionName) => {
    session.joinSession(sessionName, socket);
  });

  socket.on('disconnect', () => {
    session.leaveSession(socket);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

http.listen(port, () => {
  console.log(`listening on ${port}`);
});
