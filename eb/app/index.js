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
const { getTrackInfo } = require('./utils/soundcloud');
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

  // DJ accepts song request
  socket.on('accept request', (songObj) => {
    const sessionName = session.getClientSession(socket);
    const isDj = session.isDj(socket, sessionName);
    const song = JSON.stringify(songObj);

    if (isDj) {
      addSong(sessionName, song)
        .then((queue) => {
          io.to(sessionName).emit('new song', song);
          logging.log(`request accepted: ${song.id}, new queue=${queue} [session=${sessionName}]`);
        })
        .catch(err => logging.error(err));
    }
  });

  // add song
  socket.on('add song', (songUrl) => {
    const sessionName = session.getClientSession(socket);
    const isDj = session.isDj(socket, sessionName);
    
    getTrackInfo(songUrl)
      .then((response) => {
        const song = JSON.stringify({
          id: response.id,
          title: response.title,
          artist: response.user.username,
          url: response.permalink_url
        });

        if (isDj) {
          addSong(sessionName, song)
            .then((queue) => {
              io.to(sessionName).emit('new song', song);
              logging.log(`song added: ${song.id}, new queue: ${queue} [session=${sessionName}]`);
            })
            .catch(err => logging.error(err));
        } else {
          const { dj } = session.getSessionInfo(sessionName);
          dj.emit('new request', song);
          logging.log(`request added: ${song.id} [session=${sessionName}]`);
        }
      })
      .catch(err => logging.error(err));
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
  const sessionInfo = session.getSessionInfo(sessionName);
  if (sessionInfo) {
    getSongQueue(sessionName)
      .then((response) => {
        const data = {
          songQueue: JSON.parse(response).song_queue,
          djId: sessionInfo.dj.id
        };
        res.json(data);
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
