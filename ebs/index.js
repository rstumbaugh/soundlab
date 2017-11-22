const express = require('express')
const path = require('path')
const app = express()
const port = 8081

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, err => {
  if (err) {
    return;
  }

  console.log('listening...')
})
