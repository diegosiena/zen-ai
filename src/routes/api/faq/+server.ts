import { faqs } from '$lib/data/faq.js';
import { performQuery } from '$lib/utils/google-gen-ai/embedding.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { query } = await request.json();

	if (!query) {
		return error(400, 'Missing query');
	}

	const res = await performQuery(query, faqs);

	return json(res);
}
