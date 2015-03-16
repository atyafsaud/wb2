

var express = require('express')
 , app = express()
 , server = require('http').Server(app)
 , io = require('socket.io').listen(server)
 , mysql = require('mysql');
 
	//var redis = require('redis'),
    // rclient = redis.createClient();
	

server.listen(3000);

var conn_conf= {
    host     : 'localhost',
    port     :3306,
    user     : 'root',
    password : '',
    database: 'users_accounts'
};

var connection = mysql.createConnection(conn_conf);

connection.connect(function(err) {
    if(err) console.log("Could not connect to DB");
    else{
        console.log("Connected to "+conn_conf.database+' on '+conn_conf.host );
    }
});


//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/form'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/form/form.html');
});



io.sockets.on('connection', function(client) {  
    console.log('Client connected...');
	client.on('join', function(data) {
        console.log(data);
    });
	client.on('pers_info', function(pers_info) {
  new user({
    firstname : pers_info.firstname,
    Midname : pers_info.Midname,
    lastname: pers_info.lastname,
	Email: pers_info.Email,
	password: pers_info.password,
	secretQuestion: pers_info.secretQuestion
  }).save(function(err, docs) {
    if(err) { return console.log("error"); }
    socket.emit('callback', {done: 'Done', pers_info: pers_info});
  });
  });
	
	});

io.sockets.on('connection', function(socket) {
socket.on('userDraw', function(data) {
socket.broadcast.emit('userDrawing', data); });
});

/*io.sockets.on('connection', function (socket) {
    var board_id = socket.handshake.query.board_id;
    if(!board_sockets[board_id]) board_sockets[board_id] = [];
    // TODO: Do something if the board_id is undefined
    board_sockets[board_id].push(socket);
	console.log("start1111");
    var redis_key = "board_" + board_id;
    rclient.lrange(redis_key, 0, -1, function(err, res) {
	socket.on('userDraw', function(data) {
		socket.broadcast.emit('userDrawing', data)
			console.log("start2222");

	})});
    
    socket.on('update', function (data) {
        for(idx in board_sockets[board_id]) {
            var s = board_sockets[board_id][idx];
            if(s != socket) {
               s.emit('update', data);
            }
        }
    });
});    
*/




