import { runChat } from '$lib/utils/chat.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { message, history } = await request.json();

	if (!message) {
		return error(400, 'Missing message');
	}

	if (!history && !Array.isArray(history)) {
		return error(400, 'Missing/invalid history');
	}

	const response = await runChat(message, history);

	return json(response);
}
