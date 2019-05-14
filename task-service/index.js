const tcp = require('nexios-tcp');

const server = tcp.createServer();

server.on('message', (msg, send) => {
	console.log('Received message from client: %j', msg);
	send({ message: 'Hello from task-service' });
});

server.listen(8001, () => {
	console.log('task-service started on port 3000');
});
