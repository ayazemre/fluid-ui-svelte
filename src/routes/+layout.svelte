<script lang="ts">
	import '../app.css';
	import Container from '../lib/base/Container.svelte';
	import Text from '../lib/base/Text.svelte';
	import Image from '../lib/base/Image.svelte';
	import Link from '../lib/base/Link.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { globalState } from './globalState.svelte.js';
	import Button from '../lib/base/Button.svelte';

	let { children } = $props();
</script>

<Container
	type="section"
	class={'flex min-h-screen w-full flex-col' + (globalState.darkMode ? ' dark' : '')}
	id="global-layout"
>
	<Container
		type="nav"
		class={'z-2 flex w-full justify-between p-4' +
			(page.url.pathname !== '/' ? ' border-b border-neutral-300 dark:border-neutral-700 ' : ' ')}
		id="navigation-bar"
	>
		<Link href="/" overrideDefaultStyling={true}>
			<Container class="flex items-center gap-2 text-2xl font-bold" id="branding-block">
				<div class="flex items-center gap-2">
					<svg
						class="size-8 transition-all hover:brightness-125"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect x="2" y="2" width="12" height="12" rx="2" fill="#5067EB" />
						<rect x="18" y="2" width="12" height="12" rx="2" fill="#5067EB" opacity="0.7" />
						<rect x="2" y="18" width="12" height="12" rx="2" fill="#5067EB" opacity="0.7" />
						<rect x="18" y="18" width="12" height="12" rx="2" fill="#5067EB" />
					</svg>
				</div>

				<Text class="text-black transition-colors dark:text-neutral-100">Fluid UI</Text>
			</Container>
		</Link>

		<Button
			onclick={async () => {
				globalState.darkMode = !globalState.darkMode;
				console.log(globalState.darkMode);
			}}
			class="fluid-button-transparent size-10"
		>
			<Icon icon={globalState.darkMode ? 'ri-moon-line' : 'ri-sun-line'} class="size-6"></Icon>
		</Button>
	</Container>
	{@render children()}
</Container>
