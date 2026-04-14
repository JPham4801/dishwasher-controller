import { useState, useEffect, useRef } from 'react';

const INACTIVE_STATES = ['IDLE', 'COMPLETE', 'ERROR'];

function Timer({ currentState }) {
	const [elapsed, setElapsed] = useState(0);
	const [prevState, setPrevState] = useState(currentState);
	const currentStateRef = useRef(currentState);

	if (prevState !== currentState) {
		setPrevState(currentState);

		const startingNewRun = currentState === 'STARTING';
		if (startingNewRun) {
			setElapsed(0);
		}
	}

	// Every time the state changes, the starting time for that state is the current time
	useEffect(() => {
		currentStateRef.current = currentState;
	}, [currentState]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!INACTIVE_STATES.includes(currentStateRef.current)) {
				setElapsed(e => e + 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return <h1>Time elapsed: {elapsed}s</h1>;
}

export default Timer;
