require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  pingInterval: 15 * 1000,
  pingTimeout: 30 * 1000
});
const session = require('./utils/session');
const logging = require('./utils/logging');
const { addSong, getSongQueue, deleteSession } = require('./utils/lambda');
const port = 8081;

app.use(express.static('dist'));

io.on('connection', (socket) => {
  logging.log(`[client=${socket.id}] connected`);

  // create & join new session
  socket.on('create session', () => {
    const sessionName = session.createSession(socket);
    session.joinSession(sessionName, socket);
    io.to(sessionName).emit('session created', sessionName);
    logging.log(`[client=${socket.id}] created session ${sessionName}`);
  });

  // join existing session
  socket.on('join session', (sessionName) => {
    if (session.getClientSession(socket) !== undefined) {
      return;
    }

    session.joinSession(sessionName, socket);
    io.to(sessionName).emit('new client', `${socket.id} joined the session`);
    logging.log(`[client=${socket.id}] joined session ${sessionName}`);
  });

  // add song
  socket.on('add song', (songId) => {
    const sessionName = session.getClientSession(socket);
    const isDj = session.isDj(socket, sessionName);

    if (isDj) {
      // if DJ, add song immediately & send new song to all listeners
      addSong(sessionName, songId)
        .then((response) => {
          io.to(sessionName).emit('new song', `New song in queue: ${songId}`);
          logging.log(`song ID ${songId} added, ` +
            `new queue: ${response} [session=${sessionName}]`);
        })
        .catch((err) => {
          logging.error(err);
        });
    } else {
      // send message to DJ with song request
      const { dj } = session.getSessionInfo(sessionName);
      dj.emit('new request', `New song request: ${songId}`);
      logging.log(`request added: ${songId} [session=${sessionName}]`);
    }
  });

  // user leaves session
  socket.on('disconnect', () => {
    const sessionName = session.getClientSession(socket);
    const sessionEnded = session.leaveSession(socket);

    if (sessionEnded) {
      deleteSession(sessionName);
      io.to(sessionName).emit('session over');
      logging.log(`DJ left, session over [session=${sessionName}]`);
    }

    logging.log(`[client=${socket.id}] disconnected`);
  });
});

// check if session exists. if yes, send song queue. otherwise 404
app.get('/api/session/:sessionName', (req, res) => {
  const { sessionName } = req.params;
  if (session.getSessionInfo(sessionName)) {
    getSongQueue(sessionName)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        logging.error(err);
        res.status(500).send({ message: 'Error getting song queue' });
      });
  } else {
    res.status(404).send({ message: 'Session does not exist.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

http.listen(port, () => {
  logging.log(`listening on ${port}`);
});
