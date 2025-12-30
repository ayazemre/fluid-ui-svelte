import { error, type RequestHandler } from '@sveltejs/kit';
import libraryGuidelines from '../../../guidelines/library_guidelines.md?raw';

export const GET: RequestHandler = async () => {
	try {
		return new Response(libraryGuidelines, {
			headers: {
				'Content-Type': 'text/markdown; charset=utf-8'
			}
		});
	} catch (e) {
		console.log(e);
		return error(404, 'Library guidelines not found');
	}
};
