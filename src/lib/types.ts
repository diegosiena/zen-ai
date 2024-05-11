export interface ChatMessage {
	role: 'user' | 'model';
	datetime: string;
	message: string;
}
