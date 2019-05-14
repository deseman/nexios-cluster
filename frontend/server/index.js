require('console-stamp')(console, 'HH:MM:ss.l');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// service clients
const tcp = require('node-tcp');
const os = require('os');

const host = 'task-service.default.svc.cluster.local';
const port = 8001;
const tcpClient = tcp.createClient({ host, port }, send => {
  console.log('connected to tasks-service');

  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/ping', (req, res) => {
    return res.send('pong');
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  app.get('/tasks', (req, res) => {
    send(
      {
        message: `hello from ${os.hostname()}`
      },
      (err, message) => {
        res.write(Buffer.from(JSON.stringify(message)));
        res.end();
      }
    );
  });

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`frontend server started on port ${port}`);
  });
});

tcpClient.on('error', err => console.log('%j', err));
