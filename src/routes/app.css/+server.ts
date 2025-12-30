import { error, type RequestHandler } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const GET: RequestHandler = async () => {
	try {
		const filePath = resolve('src/lib/app.css');
		const fileContent = await readFile(filePath, 'utf-8');

		return new Response(fileContent, {
			headers: {
				'Content-Type': 'text/css; charset=utf-8'
			}
		});
	} catch (e) {
		console.log(e);
		return error(404, 'App.css not found');
	}
};
