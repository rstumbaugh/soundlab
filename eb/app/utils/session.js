let sessions = {};

// join or create session
function joinSession(sessionName, socket) {
  socket.join(sessionName);

  if (sessions[sessionName]) {
    sessions[sessionName].clients.push(socket);
    socket.emit('joined', 'Joined session!'); // return session queue here
  } else {
    sessions[sessionName] = {
      dj: socket,
      clients: [socket]
    };
    socket.emit('joined', 'Created session!');
  }
}

function isDj(socket, sessionName) {
  return sessions[sessionName].dj.id === socket.id;
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
    const clientIndex = clients.indexOf(c => c.id === socket.id);
    clients.splice(clientIndex, 1);
    sessions[sessionName].clients = clients;

    if (socket.id === dj.id) {
      delete sessions[sessionName];
      return true;
    }
    return false;
  }

  const session = getClientSession(socket);
  return leaveSession(socket, session);
}

module.exports = {
  joinSession, leaveSession, getSessionInfo, getClientSession, isDj
};
