function SensorReadings({ sensors }) {
    return (
			<div>
				{sensors.door ? 'Open' : 'Closed'}
				{sensors.emergencyStop ? 'Active' : 'Okay'}
			</div>
		);
}

export default SensorReadings;
