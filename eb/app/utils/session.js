const logging = require('./logging');

let io;
let sessions = {};

function init(socketIo) {
  io = socketIo;
}

// join or create session
function joinSession(sessionName, socket) {
  socket.join(sessionName);

  if (sessions[sessionName]) {
    sessions[sessionName].clients.push(socket);
    socket.emit('joined', 'Joined session!'); // return session queue here
    io.to(sessionName).emit('new client', `${socket.id} joined the session`);
  } else {
    sessions[sessionName] = {
      dj: socket,
      clients: [socket]
    };
    socket.emit('joined', 'Created session!');
  }
}

// get clients & dj for a session
function getSessionInfo(sessionName) {
  return sessions[sessionName];
}

// find client's active session
function getClientSession(socket) {
  let sessionName;
  Object.keys(sessions).forEach((name) => {
    const session = sessions[name];
    const clientIds = session.clients.map(c => c.id);
    if (clientIds.includes(socket.id)) {
      sessionName = name;
    }
  });

  return sessionName;
}

// have client leave session
function leaveSession(socket, sessionName = '') {
  if (sessionName) {
    let { clients, dj } = sessions[sessionName];
    const clientIndex = clients.find(c => c.id === socket.id);
    clients.splice(clientIndex);
    sessions[sessionName].clients = clients;

    if (socket.id === dj.id) {
      io.to(sessionName).emit('session over', 'DJ has left the session.');
      logging.log(`dj left [session=${sessionName}]`);
      delete sessions[sessionName];
    }
  } else {
    const session = getClientSession(socket);
    if (session) {
      leaveSession(socket, session);
    }
  }
}

module.exports = {
  init, joinSession, leaveSession, getSessionInfo
};
