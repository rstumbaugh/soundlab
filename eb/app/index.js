require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  pingInterval: 10000,
  pingTimeout: 10000
});
const session = require('./utils/session');
const logging = require('./utils/logging');
const { addSongRequest } = require('./utils/lambda');
const port = 8081;

session.init(io);
app.use(express.static('dist'));

io.on('connection', (socket) => {
  logging.log(`connected [client=${socket.id}]`);
  socket.on('join session', (sessionName) => {
    session.joinSession(sessionName, socket);
    logging.log(`joined session [session=${sessionName}, client=${socket.id}]`);
  });

  socket.on('add song', (songId) => {
    const sessionName = session.getClientSession(socket);
    const isDj = session.isDj(socket, sessionName);

    addSongRequest(sessionName, songId)
      .then(response => console.log(response))
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('disconnect', () => {
    logging.log(`disconnected [client=${socket.id}]`);
    session.leaveSession(socket);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

http.listen(port, () => {
  logging.log(`listening on ${port}`);
});
