/* SERVER */
var express = require('express')
var http = require('http')
var socketIO = require('socket.io')
var app = express()
var httpServer = http.createServer(app)
var io = socketIO.listen(httpServer)
app.use(express.static((__dirname, 'public')))
httpServer.listen(process.env.PORT || 5000, function () {
  console.log('Server listening at ' + (process.env.PORT || 5000))
})

io.on('connection', function (socket) {
  socket.on('msg', function (incomingMsg) {
    io.emit('msg', incomingMsg)
  })
})
