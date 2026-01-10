import { error, type RequestHandler } from '@sveltejs/kit';
import fluiduicss from '../../fluidui.css?raw';

export const GET: RequestHandler = async () => {
	try {
		return new Response(fluiduicss, {
			headers: {
				'Content-Type': 'text/css; charset=utf-8'
			}
		});
	} catch (e) {
		console.log(e);
		return error(404, 'App.css not found');
	}
};
