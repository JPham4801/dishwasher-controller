// TODO: replace with HTTP calls to Python hardware layer
const relays = {
	DRAIN: 1,
	WATER: 2,
	DETERGENT: 3,
	RINSE: 4,
	SANITIZE: 5,
	setRelay: (relay, state) => console.log(`Relay ${relay} set to ${state}`),
	turnOffAll: () => console.log('All relays off'),
};

// TODO: returns true for all sensors in dev. remove and replace with real values
const sensors = {
	readSensor: (sensor) => true,
};


// TODO: 
const config = {
	minWaterTemp: 120,
	minPressure: 45,
	maxPressure: 55,
};

const STATES = ['STARTING', 'IDLE', 'FILLING', 'WASHING', 'DRAINING', 'RINSING', 'DWELLING', 'SANITIZING', 'COMPLETE', 'ERROR'];

// TODO: uncomment below for production
// const cycleDurations = {
// 	filling: 60000, // TODO: temp time, change to real value. exits when guards pass (pressure and temp, see 'Machine settings" in gpio_config.py )
// 	washing: 45000,
// 	washingDetergent: 10000,
// 	draining: 15000,
// 	rinsing: 30000,
// 	sanitizing: 10000,
// 	dwelling: 15000,
// 	dwellDrain: 8000,
// 	dwellRinse: 7000,
// };

// TODO: Testing only. Remove for production
const cycleDurations = {
	filling: 6000,
	washing: 4500,
	washingDetergent: 1000,
	draining: 1500,
	rinsing: 3000,
	sanitizing: 1000,
	dwelling: 1500,
	dwellDrain: 800,
	dwellRinse: 700,
};

let currentState = 'IDLE';

let startupCheck = () => {
	let errors = [];

	if (sensors.readSensor('IS_DOOR_CLOSED') === false) {
		errors.push('Door is open');
	}
	if (sensors.readSensor('WATER_LEVEL') === false) {
		errors.push('Water level too low');
	}
	if (sensors.readSensor('PRESSURE') === false) {
		errors.push('Pressure out of range');
	}
	if (sensors.readSensor('IS_EMERGENCY_STOP_IDLE') === false) {
		errors.push('Emergency Stop Pressed');
	}
	if (errors.length === 0) {
		return true;
	} else {
		console.log(errors)
		return errors;
	}
};

let onStateChange = null; // holds callback for state

let transitionState = (newState) => {
	if (!STATES.includes(newState)) {
		return `Invalid state: ${newState}`;
	} else {
		currentState = newState;
		console.log(`State changed to ${newState}`);

		if (onStateChange) onStateChange(newState); // notify the listeners on state change
		return true;
	}
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let runCycle = async () => {
	const check = startupCheck();
	if (check !== true) {
		transitionState('ERROR');
		return check;
	}

	// Starting cycle
	transitionState('STARTING');
	relays.turnOffAll();

	// Filling
	transitionState('FILLING');
	relays.setRelay('WATER', true);
	await wait(cycleDurations.filling);
	relays.turnOffAll();

	// Washing
	transitionState('WASHING');
	relays.setRelay('DETERGENT', true); // May add timer if needed for less detergent
	relays.setRelay('RINSE', true);
	await wait(cycleDurations.washing);
	relays.turnOffAll();

	// Draining
	transitionState('DRAINING');
	relays.setRelay('DRAIN', true);
	await wait(cycleDurations.draining);
	relays.turnOffAll();

	// Rinsing
	transitionState('RINSING');
	relays.setRelay('RINSE', true);
	await wait(cycleDurations.rinsing);
	relays.turnOffAll();

	// Sanitizing
	transitionState('SANITIZING');
	relays.setRelay('SANITIZE', true);
	await wait(cycleDurations.sanitizing);
	relays.turnOffAll();

	// Dwelling
	transitionState('DWELLING');
	relays.setRelay('DRAIN', true);
	relays.setRelay('RINSE', true);
	await wait(cycleDurations.dwellRinse);
	relays.setRelay('RINSE', false);
	await wait(cycleDurations.dwellDrain);
	relays.turnOffAll();

	// Complete and return to IDLE
	transitionState('COMPLETE');
	relays.turnOffAll();
	transitionState('IDLE');
};

let isEmergencyStopIdle = () => {
	relays.turnOffAll();
	transitionState('ERROR');
};

module.exports = {
	runCycle,
	isEmergencyStopIdle,
	transitionState,
	setOnStateChange: (cb) => {
		onStateChange = cb;
	},
	getState: () => currentState, // always reads the current value
};