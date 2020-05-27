const express = require('express')
const https = require('https')
const fs = require('fs')
const port = 5555

var key = fs.readFileSync(__dirname + '/certs/localhost.key')
var cert = fs.readFileSync(__dirname + '/certs/localhost.crt')
var options = {
  key,
  cert
}

var app = express()
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html')
})

var server = https.createServer(options, app)

server.listen(port, _ => console.log('Listening on port', port))
