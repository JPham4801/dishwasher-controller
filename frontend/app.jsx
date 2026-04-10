import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import CycleDisplay from './components/CycleDisplay';
import ControlPanel from './components/ControlPanel';
import Timer from './components/Timer';
import ErrorAlert from './components/ErrorAlert';
import SensorReadings from './components/SensorReadings';

function App() {
	const [currentState, setCurrentState] = useState('IDLE');
    const [error, setError] = useState(null); // the error message, null if none
    const [sensors, setSensors] = useState({
			door: false,
			emergencyStop: false,
		});

	useEffect(() => {
		const socket = io('http://localhost:3000');

		socket.on('stateChange', (newState) => {
			setCurrentState(newState);
		});

		socket.on('error', (newError) => {
            setError(newError);
        });
        
        socket.on('sensorUpdate', (newSensorUpdate) => {
            setSensors(newSensorUpdate)
        })

		return () => {
			socket.disconnect(); // disconnects when component unmounts
		};
	}, []);

	return (
		<div>
			<ControlPanel />
			<CycleDisplay currentState={currentState} />
			<Timer currentState={currentState} />
			<ErrorAlert error={error} />
			<SensorReadings sensors={sensors} />
		</div>
	);
}

export default App;