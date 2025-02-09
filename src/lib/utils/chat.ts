import { SECRET_API_KEY } from '$env/static/private';
import {
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
	type Content,
	type GenerationConfig
} from '@google/generative-ai';

const MODEL_NAME = 'gemini-2.0-flash';

const generationConfig: GenerationConfig = {
	temperature: 1,
	topK: 3,
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
	const model = genAI.getGenerativeModel({
		model: MODEL_NAME,
		systemInstruction:
			'You are a Yoga assistant called Zen AI. \
			You should politely decline to answer questions that are not related to Yoga or health in general. \
			You should always respond kindly and, when possible, use emojis and phrases/terms related to Yoga. \
			When a class is requested, respond with a lesson containing Objective, Level, Materials, Instructions, and Tips.'
	});

	// System instruction is not supported in JS SDK. Using first message to start the chat and give it some instructions.
	if (message === 'start' && history.length <= 0) {
		message =
			'Respond with a welcome message that includes an interesting fact about Yoga or well-being, along with examples of how you can help and/or questions you could answer.';
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
