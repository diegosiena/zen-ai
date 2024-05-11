<script lang="ts">
	import { faqs } from '$lib/data/faq';
	import type { PerformQueryResponse } from '$lib/utils/google-gen-ai/embedding';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import SvelteMarkdown from 'svelte-markdown';

	let query = '';
	let results: PerformQueryResponse[] = [];
	let loading = false;

	const onTextKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.stopPropagation();
			e.preventDefault();
			search();
		}
	};

	const search = async () => {
		try {
			loading = true;

			const response = await fetch('/api/faq', {
				method: 'POST',
				body: JSON.stringify({
					query
				})
			});

			if (response.ok) {
				const responseBody = await response.json();
				results = responseBody;
			}
		} catch (error) {
			alert('Erro');
		} finally {
			loading = false;
		}
	};

	const cleanSearch = () => {
		results = [];
		query = '';
	};
</script>

<section class="container mx-auto space-y-8 p-8">
	<h1 class="h1">Perguntas e Respostas sobre Yoga 🧘‍♂️</h1>
	<p>
		Espero que essas perguntas e respostas tenham te ajudado a entender melhor o Yoga. Namaste! 🙏
	</p>

	<aside class="alert variant-ghost-secondary">
		<p>
			Estas perguntas e respostas foram geradas pelo próprio <strong>Google Gemini</strong>, através
			do <strong>Google AI Studio</strong>.
			<br />
			<strong>Prompt utilizado:</strong>
			<i>"Gere 20 perguntas e respostas relacionadas a Yoga. Use emojis."</i>
			<br />
			<br />
			Estas perguntas e respostas são utilizadas na aplicação do conceito de
			<strong>Embedding</strong> para retornar as respostas aqui definidas, de acordo com o contexto
			da pergunta no chat.
		</p>
	</aside>

	<div class="card variant-ringed p-8">
		<h3 class="h3 mb-4 text-center">Pesquise em nossas perguntas frequentes</h3>
		<div class="input-group input-group-divider grid-cols-[1fr_auto_auto] rounded-container-token">
			<textarea
				bind:value={query}
				class="border-0 bg-transparent p-2 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Digite uma pesquisa e clique em 'Pesquisar' ou pressione enter..."
				rows="1"
				on:keydown={onTextKeyDown}
				disabled={loading}
			/>
			<button class="variant-soft" on:click={cleanSearch} disabled={loading}>Limpar</button>
			<button class="variant-filled-primary" on:click={search} disabled={loading}>Pesquisar</button>
		</div>
	</div>

	{#if results && results.length}
		<h4 class="h4">Aqui estão os 3 resultados mais relevantes para sua busca:</h4>
	{/if}

	{#if loading}
		<div class="placeholder animate-pulse" />
		<div class="placeholder animate-pulse" />
		<div class="placeholder animate-pulse" />
	{:else}
		<Accordion autocollapse spacing="space-y-4">
			{#if results && results.length}
				{#each results as result, index}
					<AccordionItem class="variant-soft " open={index === 0}>
						<svelte:fragment slot="summary">
							<strong>{result.faq.question}</strong>
							<span class="ml-4">
								(Score: {result.percentage.toLocaleString()}%)
							</span>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<div class="markdown">
								<SvelteMarkdown source={result.faq.answer} />
							</div>
						</svelte:fragment>
					</AccordionItem>
				{/each}
			{:else}
				{#each faqs as faq, index}
					<AccordionItem class="variant-soft " open={index === 0}>
						<svelte:fragment slot="summary"><strong>{faq.question} </strong></svelte:fragment>
						<svelte:fragment slot="content">
							<div class="markdown">
								<SvelteMarkdown source={faq.answer} />
							</div>
						</svelte:fragment>
					</AccordionItem>
				{/each}
			{/if}
		</Accordion>
	{/if}
</section>
