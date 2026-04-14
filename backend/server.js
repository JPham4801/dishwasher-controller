const stateMachine = require('./stateMachine')
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // allow both
		methods: ['GET', 'POST'],
	},
});

stateMachine.setOnStateChange((newState) => {
	io.emit('stateChange', { state: newState });
});

// REST endpoints
app.post('/start-cycle', (req, res) => {
	stateMachine.runCycle();
	res.send('Cycle started');
});

app.post('/emergency-stop', (req, res) => {
    stateMachine.isEmergencyStopIdle();
	res.send('Emergency Stop Pressed');
});

app.get('/status', (req, res) => {
	res.json({ state: stateMachine.getState() });
});

// Socket.io events
io.on('connection', (socket) => {
	console.log('--Client connected--');
	socket.emit('stateChange', { state: stateMachine.getState() });
});

server.listen(3000, () => {
	console.log('Server running on port 3000');
});