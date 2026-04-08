const stateMachine = require('./stateMachine')
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

stateMachine.onStateChange = (newState) => {
	io.emit('stateChange', { state: newState });
};

// REST endpoints
app.post('/start-cycle', (req, res) => {
	stateMachine.runCycle();
	res.send('Cycle started');
});

app.post('/emergency-stop', (req, res) => {
    stateMachine.emergencyStop();
	res.send('Emergency stop is active');
});

app.get('/status', (req, res) => {
	res.json({ state: stateMachine.getState() });
});

// Socket.io events
io.on('connection', (socket) => {
	console.log('Client connected');
	socket.emit('stateChange', { state: stateMachine.getState() });
});

server.listen(3000, () => {
	console.log('Server running on port 3000');
});
