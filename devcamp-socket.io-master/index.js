var express = require('express')
	, app = express() 
	, server = require('http').Server(app)
	, io = require('socket.io').listen(server)

app.configure(function() {
	app.use(express.static(__dirname + '/public'))
})

io.sockets.on('connection', function(socket) {
	socket.on('userDraw', function(data) {
		socket.broadcast.emit('userDrawing', data)
	})
})


server.listen(3000)