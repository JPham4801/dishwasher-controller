const stateMachine = require('./stateMachine')
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// REST endpoints
app.post('/start-cycle', (req, res) => {
	stateMachine.runCycle();
	res.send('Cycle started');
});

app.post('/emergency-stop', (req, res) => {
    stateMachine.relays([turnOffAll]);
    transitionState('ERROR')
	res.send('Emergency stop is active');
});

app.get('/status', (req, res) => {
	res.send(stateMachine.currentState);
});

// Socket.io events

server.listen(3000, () => {
	console.log('Server running on port 3000');
});
