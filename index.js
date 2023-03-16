const csvToJson = require('convert-csv-to-json');
const { writeFileSync } = require('fs');
const crypto = require('crypto');

//Get the hash pepper from the environment variable
const HASH_PEPPER = '';

//Hashing function
const sha256Hash = (value) => {
	return crypto.createHash('sha256').update(value).digest('hex');
};

//Hashing function with pepper
const hashEmailWithPepper = (email) => {
	return sha256Hash(`${email}.${HASH_PEPPER}`);
};


const run = async () => {

    const output = ['CSVHEADERWITHCOMMASEPARATEDVALUES'];

	const timestamp = new Date().toISOString();
	const customers = csvToJson.fieldDelimiter(',').getJsonFromCsv('///pathToInput.csv');
	for (const customer of customers) {
		const tx_hash_id = hashEmailWithPepper(customer.email);

		output.push(`OUTPUTCSVHEADERWITHCOMMASEPARATEDVALUES`);
	}
	await writeFileSync('///pathToOutput.csv', output.join('\n'));
};

run();
