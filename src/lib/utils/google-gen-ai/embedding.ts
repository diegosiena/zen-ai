import { SECRET_API_KEY } from '$env/static/private';
import type { Faq } from '$lib/data/faq';
import { GoogleGenerativeAI, TaskType } from '@google/generative-ai';

export interface PerformQueryResponse {
	faq: Partial<Faq>;
	percentage: number;
}

const genAI = new GoogleGenerativeAI(SECRET_API_KEY);
const model = genAI.getGenerativeModel({ model: 'embedding-001' });

export const embedRetrivalQuery = async (queryText: string) => {
	const result = await model.embedContent({
		content: { parts: [{ text: queryText }], role: '' },
		taskType: TaskType.RETRIEVAL_QUERY
	});

	const embedding = result.embedding;
	return embedding.values;
};

// Returns Euclidean Distance between 2 vectors
const euclideanDistance = (a: number[], b: number[]) => {
	let sum = 0;
	for (let n = 0; n < a.length; n++) {
		sum += Math.pow(a[n] - b[n], 2);
	}

	return 1 / (1 + Math.sqrt(sum));
};

// Performs a relevance search for queryText in relation to a known list of embeddings
export const performQuery = async (
	queryText: string,
	faqs: Faq[]
): Promise<PerformQueryResponse[]> => {
	const queryValues = await embedRetrivalQuery(queryText);
	const response: PerformQueryResponse[] = [];
	console.log(queryText);

	for (const faq of faqs) {
		const percentage = euclideanDistance(faq.values, queryValues) * 100;

		response.push({
			faq: {
				answer: faq.answer,
				question: faq.question
			},
			percentage
		});
	}

	// sort response by value
	const sortedResponse = response.sort((a, b) => b.percentage - a.percentage);

	const firstThree = sortedResponse.slice(0, 3);
	console.log('PERFORM QUERY: query:', queryText, '. firstThree:', firstThree);
	return firstThree;
};
