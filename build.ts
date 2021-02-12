import axios from 'axios';
import fs from 'fs';
import { Agent } from 'https';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

(async () => {
	const ca = (await axios.get<string>('https://static.developer.riotgames.com/docs/lol/riotgames.pem', {
		responseType: 'text'
	})).data;

	await writeFile('riotgames.pem', ca);

	const httpsAgent = new Agent({
		ca
	});

	await writeFile('openapi.json', JSON.stringify((await axios.get('https://127.0.0.1:2999/swagger/v3/openapi.json', {
		httpsAgent
	})).data), 'utf8');
})().catch(console.error);
