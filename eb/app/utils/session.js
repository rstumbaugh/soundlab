let sessions = {};
const sessionNameLength = 5;

function getUniqueSessionName() {
  let sessionName;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  do {
    sessionName = '';
    for (let i = 0; i < sessionNameLength; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      sessionName += chars.charAt(idx);
    }
  } while (sessions[sessionName]);

  return sessionName;
}

function createSession(socket) {
  const sessionName = getUniqueSessionName();

  sessions[sessionName] = {
    dj: socket,
    clients: []
  };

  return sessionName;
}

// join or create session
function joinSession(sessionName, socket) {
  if (!sessions[sessionName]) {
    return false;
  }
  socket.join(sessionName);
  sessions[sessionName].clients.push(socket);
  return true;
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
  if (session) {
    return leaveSession(socket, session);
  }

  return false;
}

module.exports = {
  createSession, joinSession, leaveSession, getSessionInfo, getClientSession, isDj
};
