<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Icon from '@iconify/svelte';
	import Link from '../../lib/base/Link.svelte';
	import Text from '../../lib/base/Text.svelte';
	import Accordion from '../../lib/components/Accordion.svelte';
	import { page } from '$app/state';
	import { mergeClasses } from '../../lib/utilities/mergeClasses.js';
	let { children } = $props();

	const base = [
		{ name: 'Button', url: '/documentation/base/button' },
		{ name: 'Container', url: '/documentation/base/container' },
		{ name: 'Image', url: '/documentation/base/image' },
		{ name: 'Input Field', url: '/documentation/base/input-field' },
		{ name: 'Link', url: '/documentation/base/link' },
		{ name: 'Text', url: '/documentation/base/text' }
	];
	const components = [
		{ name: 'Accordion', url: '/documentation/components/accordion' },
		{ name: 'Calendar', url: '/documentation/components/calendar' },
		{ name: 'Code Block', url: '/documentation/components/code-block' },
		{ name: 'Switch', url: '/documentation/components/switch' }
	];
</script>

<Container class="flex flex-1 flex-col" id="documentation-page-layout">
	<Container class="flex size-full justify-between opacity-100" id="documentation-page-two-row">
		<Container
			type="aside"
			class="flex w-1/3 min-w-64 flex-col gap-4 border-r border-neutral-300 px-4 py-8"
			id="documentation-page-sidebar"
		>
			<Link
				href="/documentation/introduction"
				class={mergeClasses(
					page.url.pathname == '/documentation/introduction' ? 'active' : '',
					'fluid-sidebar-link'
				)}
			>
				<Text>Introduction</Text>
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
								'fluid-sidebar-link'
							)}
						>
							<Text>{element.name}</Text>
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
							class={mergeClasses(
								page.url.pathname == element.url ? 'active' : '',
								'fluid-sidebar-link'
							)}
						>
							<Text>{element.name}</Text>
						</Link>
					{/each}
				{/snippet}
			</Accordion>

			<Link
				href="/documentation/helpers"
				class={mergeClasses(
					page.url.pathname == '/documentation/helpers' ? 'active' : '',
					'fluid-sidebar-link'
				)}
			>
				<Text>Helpers</Text>
			</Link>
		</Container>
		{@render children()}
	</Container>
</Container>
