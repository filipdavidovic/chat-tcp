var net = require('net')
var sockets = [];

net.createServer(function(socket) {
	sockets.push(socket);
	socket.name = socket.remoteAdress + ':' + socket.remotePort;
	
	socket.write('Welcome ' + socket.name + '\n');
	broadcast(socket.name + ' joined the chat\n', socket);

	socket.on('data', function(data) {
		broadcast(socket.name + '>' + data, socket);
	});
	
	socket.on('end', function() {
		sockets.splice(sockets.indexOf(socket), 1);
		broadcast(socket.name + ' left the chat.\n');
	});

	function broadcast(message, sender) {
		sockets.forEach(function(socket) {
			if(socket === sender) return;
			socket.write(message);
		});
		process.stdout.write(message);
	}

}).listen(5000);