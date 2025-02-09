<script lang="ts">
	import type { Content } from '@google/generative-ai';
	import SvelteMarkdown from 'svelte-markdown';

	export let message: Content | null;
	export let loading = false;
</script>

<div
	class="flex gap-2"
	class:self-end={message?.role === 'user'}
	class:ml-12={message?.role === 'user'}
	class:self-start={message?.role === 'model'}
	class:mr-12={message?.role === 'model'}
>
	<div
		class="card min-w-40 space-y-2 rounded-tl-none p-4"
		class:variant-soft={message?.role === 'model'}
		class:variant-soft-tertiary={message?.role === 'user'}
	>
		<header class="flex items-center justify-between">
			<p class="font-bold">{message?.role === 'user' ? 'You' : 'Zen AI'}</p>
		</header>
		<div class="markdown" class:placeholder={loading} class:animate-pulse={loading}>
			<SvelteMarkdown source={message?.parts?.[0]?.text} />
		</div>
	</div>
</div>
