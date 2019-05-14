const tcp = require('./tcp');

const server = tcp.createServer();

server.on('message', (msg, send) => {
	console.log('Received message from client: %j', msg);
	send({ message: 'Hello from server!' });
});

server.on('whoop', (msg, send) => {
	console.log('Received whoop!');
	send({ message: 'Whoop yourself!' });
});

server.listen(3000);
