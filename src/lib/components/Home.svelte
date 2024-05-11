<script lang="ts">
	import { onMount } from 'svelte';
	import Message from './Chat/Message.svelte';
	import type { Content } from '@google/generative-ai';

	let currentMessage = '';
	let history: Content[] = [];
	let loadingChat = false;

	const postMessage = async (message: string) => {
		loadingChat = true;
		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				body: JSON.stringify({
					message,
					history
				})
			});

			if (response.ok) {
				const body = await response.json();
				history = body.history;
			}

			loadingChat = false;
		} catch (error) {
			alert('Erro');
		} finally {
			loadingChat = false;
		}
	};

	const sendMessage = async () => {
		postMessage(currentMessage);

		history = [
			...history,
			{
				role: 'user',
				parts: [{ text: currentMessage }]
			}
		];

		currentMessage = '';
	};

	const onTextKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey && !loadingChat) {
			e.stopPropagation();
			e.preventDefault();
			sendMessage();
		}
	};

	onMount(() => {
		postMessage('start');
	});
</script>

<section class="container mx-auto space-y-8 p-8">
	<div class="grid-flow-col[auto_1fr] grid h-full gap-4">
		<div class="flex flex-col space-y-4 overflow-y-auto rounded bg-primary-100 p-4">
			{#each history as message, index}
				{#if index > 0}
					<Message {message} />
				{/if}
			{/each}

			{#if loadingChat}
				<Message message={null} loading={loadingChat} />
			{/if}
		</div>
		<div class="">
			<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
				<textarea
					bind:value={currentMessage}
					class="border-0 bg-transparent p-2 ring-0"
					name="prompt"
					id="prompt"
					placeholder="Digite a sua mensagem e clique em 'Enviar' ou pressione enter..."
					rows="2"
					disabled={loadingChat}
					on:keydown={onTextKeyDown}
				/>
				<button disabled={loadingChat} class="variant-filled-primary" on:click={sendMessage}>
					Enviar
				</button>
			</div>
		</div>
	</div>
</section>
