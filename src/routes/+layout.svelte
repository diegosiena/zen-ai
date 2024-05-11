<script lang="ts">
	import { page } from '$app/stores';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	initializeStores();

	const drawerStore = getDrawerStore();

	const drawerOpen = () => {
		drawerStore.open({});
	};

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Drawer>
	<nav class="list-nav p-4">
		<ul>
			<li>
				<a class:bg-primary-active-token={$page.route.id === '/'} href="/" on:click={drawerClose}>
					Home
				</a>
			</li>
			<li>
				<a
					class:bg-primary-active-token={$page.route.id === '/faq'}
					href="/faq"
					on:click={drawerClose}
				>
					Perguntas Frequentes
				</a>
			</li>
		</ul>
		<hr class="my-8" />
	</nav>
	<p class="px-4 text-center">
		Feito com ❤️ por <a href="https://www.github.com/diegosiena"><u> Diego Siena</u></a>
	</p>
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block">
			<nav class="list-nav p-4">
				<ul>
					<li>
						<a
							class:bg-primary-active-token={$page.route.id === '/'}
							href="/"
							on:click={drawerClose}
						>
							Home
						</a>
					</li>
					<li>
						<a
							class:bg-primary-active-token={$page.route.id === '/faq'}
							href="/faq"
							on:click={drawerClose}
						>
							Perguntas Frequentes
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 lg:hidden" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<img src="/favicon.png" alt="Yoga icon" class="mr-4 h-10 w-10" />
					<strong class="text-3xl">Zen AI </strong>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<p class="hidden lg:block">
					Feito com ❤️ por
					<a href="https://www.github.com/diegosiena"><u>Diego Siena</u></a>
				</p>
				<a
					class="variant-ghost-surface btn btn-sm ml-0"
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

	<slot />
</AppShell>
