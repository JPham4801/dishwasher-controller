const fs = require('fs');
const path = require('path');
const log = async (type, message, details = {}) => {
    const date = new Date().toISOString();

    const folderPath = path.join(__dirname, '..', 'logs/') + date.slice(0, 10) + '/';

    // success_08-05-11.json
    const fileName = type + '_' + date.slice(11, 19).replaceAll(':', '-') + '.json';

    const filePath = folderPath + fileName;

    fs.mkdir(folderPath, { recursive: true }, (err) => {
			if (err) {
				console.log('Error creating Directory: ', err);
			} else {
				fs.appendFile(
					filePath,
                    JSON.stringify({
                        time: date,
						type,
						message,
						details,
					}),
					(err) => {
						if (err) throw err;
						console.log('File created and written');
					}
				);
			}
		});

    console.log("Date: " + date);
    console.log('Path: ' + folderPath);
    console.log("File Name 1: " + fileName)
    console.log('File Name 2: ' + fileName);
    console.log(filePath);
};

module.exports = {
	log
};