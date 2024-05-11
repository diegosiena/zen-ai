<script lang="ts">
	import { page } from '$app/stores';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a class:bg-primary-active-token={$page.route.id === '/'} href="/">Home</a></li>
				<li>
					<a class:bg-primary-active-token={$page.route.id === '/faq'} href="/faq">
						Perguntas Frequentes
					</a>
				</li>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>

	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Yoga icon" class="mr-4 h-10 w-10" />
				<strong class="text-3xl">Zen AI </strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="variant-ghost-surface btn btn-sm"
					href="https://github.com/diegosiena/zen-ai"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="https://github.githubassets.com/favicons/favicon.png"
						alt="GitHub logo"
						class="mr-2 h-4"
					/>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<slot />
</AppShell>
