function log(message) {
  console.log(`${message} [${new Date(Date.now())}]`);
}

function error(message) {
  console.error(`${message} [${new Date(Date.now())}]`);
}

module.exports = {
  log, error
};
