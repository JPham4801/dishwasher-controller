import { useState, useEffect } from 'react';

function Timer({ currentState }) {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		let interval;

		if (currentState === 'IDLE') {
			setTimer(0);
		} else {
			interval = setInterval(() => {
				setTimer((prev) => prev + 1);
			}, 1000);
		}

		return () => {
			clearInterval(interval); // resets timer
		};
    }, [currentState]);
    
    return (
        <div>
            <h1>{ currentState }</h1>
            <h1>Duration: { timer }s</h1>
        </div>
    )
}

export default Timer;
