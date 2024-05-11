import { SECRET_API_KEY } from '$env/static/private';
import { faqs } from '$lib/data/faq';
import { GoogleGenerativeAI, TaskType } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(SECRET_API_KEY);
const model = genAI.getGenerativeModel({ model: 'embedding-001' });

// Helper function used to embed faqs and store the values in faqs array under lib/data/faq.ts
export const embedRetrievalFaqs = async () => {
	const result = await model.batchEmbedContents({
		requests: faqs.map((faq) => ({
			content: {
				parts: [{ text: `Pergunta: ${faq.question} \n Resposta: ${faq.answer}` }],
				role: ''
			},
			taskType: TaskType.RETRIEVAL_DOCUMENT
		}))
	});

	const embeddings = result.embeddings;
	return embeddings.map((e, i) => ({ ...faqs[i], values: e.values }));
};
