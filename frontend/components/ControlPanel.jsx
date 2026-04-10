function ControlPanel() {
    function handleStart() {
        fetch('http://localhost:3000/start-cycle', {
					method: 'POST',
				});
    }
    
    function handleStop() {
        fetch('http://localhost:3000/emergency-stop', {
					method: 'POST',
				});
    }

    return (
        <div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Emergency Stop</button>
        </div>
    )
}

export default ControlPanel;