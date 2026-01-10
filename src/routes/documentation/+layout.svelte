<script lang="ts">
	import { Container, Link, Text } from '$lib/base/index.js';
	import { Accordion, Drawer } from '$lib/components/index.js';
	import { globalState } from '../globalState.svelte.js';
	import { mergeClasses } from '$lib/utilities/common.js';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { componentRegistry } from '../../documentation/registry.js';

	let { children } = $props();

	const base = Object.entries(componentRegistry.base).map(([slug, data]) => ({
		name: data.title.replace('Fluid UI - ', ''),
		url: `/documentation/base/${slug}`
	}));

	const components = Object.entries(componentRegistry.components).map(([slug, data]) => ({
		name: data.title.replace('Fluid UI - ', ''),
		url: `/documentation/components/${slug}`
	}));

	// Close drawer on navigation
	$effect(() => {
		if (page.url.pathname) {
			globalState.isDocumentationDrawerOpen = false;
		}
	});
</script>

{#snippet navigationContent()}
	<Link
		href="/documentation/getting-started"
		class={mergeClasses(
			page.url.pathname == '/documentation/getting-started' ? 'active' : '',
			'fluid-sidebar-link p-2'
		)}
	>
		<Text overrideDefaultStyling>Getting Started</Text>
	</Link>

	<Accordion>
		{#snippet header(options)}
			<Text>Base</Text>
			<Icon icon={options.isExpanded ? 'raphael:arrowdown' : 'raphael:arrowright'}></Icon>
		{/snippet}

		{#snippet body()}
			{#each base.sort((a, b) => a.name.localeCompare(b.name)) as element}
				<Link
					href={element.url}
					class={mergeClasses(
						page.url.pathname == element.url ? 'active' : '',
						'fluid-sidebar-link p-2 text-left'
					)}
				>
					{element.name}
				</Link>
			{/each}
		{/snippet}
	</Accordion>
	<Accordion>
		{#snippet header(options)}
			<Text>Components</Text>
			<Icon icon={options.isExpanded ? 'raphael:arrowdown' : 'raphael:arrowright'}></Icon>
		{/snippet}

		{#snippet body()}
			{#each components as element}
				<Link
					href={element.url}
					overrideDefaultStyling
					class={mergeClasses(
						page.url.pathname == element.url ? 'active' : '',
						'fluid-sidebar-link p-2 text-left'
					)}
				>
					{element.name}
				</Link>
			{/each}
		{/snippet}
	</Accordion>
	<Link
		href="/documentation/how-to"
		class={mergeClasses(
			page.url.pathname == '/documentation/how-to' ? 'active' : '',
			'fluid-sidebar-link p-2'
		)}
	>
		<Text overrideDefaultStyling>How To</Text>
	</Link>
	<Link href="/llm-protocol" class={mergeClasses('', 'fluid-sidebar-link p-2')}>
		<Text overrideDefaultStyling>LLM Guide</Text>
	</Link>
{/snippet}

<Container
	class="flex flex-1 flex-col bg-neutral-50 dark:bg-neutral-900"
	id="documentation-page-layout"
>
	<!-- Mobile Drawer -->
	<Drawer
		bind:isOpen={globalState.isDocumentationDrawerOpen}
		position="left"
		transitionFn={fly}
		transitionParams={{ x: -300, duration: 300 }}
		backdropTransitionFn={fade}
		backdropTransitionParams={{ duration: 300 }}
	>
		<Container
			class="flex h-full w-64 flex-col gap-2 overflow-y-auto bg-neutral-50 p-4 dark:bg-neutral-900"
		>
			<Text type="h2" class="mb-4 text-xl font-bold">Menu</Text>
			{@render navigationContent()}
		</Container>
	</Drawer>

	<Container class="flex min-w-0 flex-1 opacity-100" id="documentation-page-two-row">
		<!-- Desktop Sidebar -->
		<Container
			type="aside"
			class="hidden min-w-64 flex-col gap-2 border-r border-neutral-300 px-4 py-8 md:flex dark:border-neutral-700"
			id="documentation-page-sidebar"
		>
			{@render navigationContent()}
		</Container>

		<!-- Content Area -->
		<Container class="w-full min-w-0 overflow-x-hidden">
			{@render children()}
		</Container>
	</Container>
</Container>
