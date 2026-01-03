<script lang="ts">
	import { Container, Link, Text, Button } from '$lib/base/index.js';
	import { Accordion, Drawer } from '$lib/components/index.js';
	import { globalState } from '../globalState.svelte.js';
	import { mergeClasses } from '$lib/utilities/common.js';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';

	let { children } = $props();

	const base = [
		{ name: 'Button', url: '/documentation/base/button' },
		{ name: 'Container', url: '/documentation/base/container' },
		{ name: 'Image', url: '/documentation/base/image' },
		{ name: 'Input Field', url: '/documentation/base/input-field' },
		{ name: 'Link', url: '/documentation/base/link' },
		{ name: 'List', url: '/documentation/base/list' },
		{ name: 'Table', url: '/documentation/base/table' },
		{ name: 'Text', url: '/documentation/base/text' }
	];
	const components = [
		{ name: 'Accordion', url: '/documentation/components/accordion' },
		{ name: 'Calendar', url: '/documentation/components/calendar' },
		{ name: 'Carousel', url: '/documentation/components/carousel' },
		{ name: 'Code Block', url: '/documentation/components/code-block' },
		{ name: 'Drawer', url: '/documentation/components/drawer' },
		{ name: 'Image Crop', url: '/documentation/components/image-crop' },
		{ name: 'Page', url: '/documentation/components/page' },
		{ name: 'Switch', url: '/documentation/components/switch' }
	];

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
