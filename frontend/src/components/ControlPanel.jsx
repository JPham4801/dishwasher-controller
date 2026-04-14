function ControlPanel({ currentState }) {
	function handleStart() {
		fetch('http://localhost:3000/start-cycle', {
			method: 'POST',
		});
		console.log('Start button pressed');
	}

	function handleStop() {
		fetch('http://localhost:3000/emergency-stop', {
			method: 'POST',
		});
		console.log('Emergency Stop button pressed');
	}

	return (
		<div>
			<button onClick={handleStart} disabled={currentState !== 'IDLE' && currentState !== 'COMPLETE'}>
				Start
			</button>
			<button onClick={handleStop}>Emergency Stop</button>
		</div>
	);
}

export default ControlPanel;
