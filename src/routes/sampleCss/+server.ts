import { error, type RequestHandler } from '@sveltejs/kit';
import sampleCSS from '$lib/app.css?raw';

export const GET: RequestHandler = async () => {
	try {
		return new Response(sampleCSS, {
			headers: {
				'Content-Type': 'text/css; charset=utf-8'
			}
		});
	} catch (e) {
		console.log(e);
		return error(404, 'App.css not found');
	}
};
