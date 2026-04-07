const logger = require('./logger');

let errorInformational = (message) => {
	logger.log('error_informational', message);
};

let errorPause = (message) => {
	logger.log('error_pause', message);
};

let errorCritical = (message) => {
    logger.log('error_critical', message);
};

errorCritical('Test message')

module.exports = {
	errorInformational,
	errorPause,
	errorCritical,
};