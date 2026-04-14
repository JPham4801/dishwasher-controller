function SensorReadings({ sensors }) {
    return (
			<div>
				{sensors.isDoorClosed ? 'Door Closed' : 'Door Opened'}
				{sensors.isEmergencyStopIdle ? 'ES WAITING' : 'ES PRESSED'}
			</div>
		);
}

export default SensorReadings;
