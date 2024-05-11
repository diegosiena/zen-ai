import { SECRET_API_KEY } from '$env/static/private';
import {
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
	type Content
} from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.5-pro-latest';

const generationConfig = {
	temperature: 1,
	topK: 0,
	topP: 0.95
};

const safetySettings = [
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
	},
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
	}
];

export const runChat = async (message: string, history: Content[]) => {
	const genAI = new GoogleGenerativeAI(SECRET_API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	// System instruction is not supported in JS SDK. Using first message to start the chat and give it some instructions.
	if (message === 'start' && history.length <= 0) {
		message =
			'Você é um assistente de Yoga chamado Zen AI. Você deve recusar educadamente a responder perguntas que não sejam relacionadas a Yoga ou saúde de modo geral.\
			 Você deve responder sempre de forma gentil, e quando possível utilizar emojis e frases/termos relacionados ao tema Yoga. \
			 Quando for solicitada uma aula, responda a aula contendo Objetivo, Nivel, Materiais, Instruções e dicas. \
			 Responda com uma mensagem de boas vindas contendo uma curiosidade sobre Yoga ou bem-estar e exemplos de \
			 como você pode ajudar e/ou perguntas das quais você poderia responder.';
	}

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history
	});

	const result = await chat.sendMessage(message);
	return {
		content: result.response.candidates?.[0]?.content,
		history: await chat.getHistory()
	};
};
