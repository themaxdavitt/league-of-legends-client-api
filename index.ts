import { readFileSync } from 'fs';
import { Agent } from 'https';
import OpenAPIClientAxios from 'openapi-client-axios';
import { OpenAPIV3 } from 'openapi-types';
import { join } from 'path';

import { Client } from './client';
import def from './openapi.json';

export const definition = def as unknown as OpenAPIV3.Document;

export function createClient(): Client {
	const api = new OpenAPIClientAxios({
		definition,
		axiosConfigDefaults: {
			httpsAgent: new Agent({
				ca: readFileSync(join(__dirname, 'riotgames.pem'), 'utf8'),
			})
		}
	});
	api.withServer({ url: `https://127.0.0.1:2999` });
	return api.initSync();
}
