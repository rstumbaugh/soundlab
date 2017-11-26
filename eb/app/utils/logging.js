function log(message) {
  console.log(`${message} [${new Date(Date.now())}]`);
}

module.exports = {
  log
};
