<script lang="ts">
	import { Container, Link, Text } from '$lib/base';
	import Icon from '@iconify/svelte';
	import { Drawer } from '$lib/components';
	import { globalState } from '../globalState.svelte';
	import { mergeClasses } from '$lib/utilities/common';
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { componentRegistry } from '../../documentation/registry';

	let { children } = $props();

	type NavigationEntry = { name: string; url: string; isExternal?: boolean };

	const toNavigationEntries = (
		registryGroup: Record<string, { title: string }>,
		category: string
	): NavigationEntry[] =>
		Object.entries(registryGroup)
			.map(([slug, registryEntry]) => ({
				name: registryEntry.title.replace('Fluid UI - ', ''),
				url: `/documentation/${category}/${slug}`
			}))
			.sort((first, second) => first.name.localeCompare(second.name));

	const guideEntries: NavigationEntry[] = [
		{ name: 'Getting started', url: '/documentation/getting-started' },
		{ name: 'How to', url: '/documentation/how-to' },
		{ name: 'Theme editor', url: '/documentation/theme' },
		{ name: 'LLM guide', url: '/llm-protocol', isExternal: true }
	];

	const navigationSections = [
		{ label: 'Guides', entries: guideEntries },
		{ label: 'base', entries: toNavigationEntries(componentRegistry.base, 'base') },
		{
			label: 'components',
			entries: toNavigationEntries(componentRegistry.components, 'components')
		}
	];

	$effect(() => {
		if (page.url.pathname) {
			globalState.isDocumentationDrawerOpen = false;
		}
	});
</script>

{#snippet navigationContent()}
	{#each navigationSections as navigationSection (navigationSection.label)}
		<Text class="documentation-sidebar-section">{navigationSection.label}</Text>
		<Container class="documentation-sidebar-group">
			{#each navigationSection.entries as navigationEntry (navigationEntry.url)}
				<Link
					href={navigationEntry.url}
					overrideDefaultStyling
					target={navigationEntry.isExternal ? '_blank' : undefined}
					rel={navigationEntry.isExternal ? 'noopener noreferrer' : undefined}
					class={mergeClasses(
						page.url.pathname === navigationEntry.url ? 'active' : '',
						'fluid-sidebar-link'
					)}
					aria-current={page.url.pathname === navigationEntry.url ? 'page' : undefined}
				>
					{navigationEntry.name}
					{#if navigationEntry.isExternal}
						<Icon icon="ph:arrow-up-right" class="documentation-external-mark" aria-hidden="true" />
					{/if}
				</Link>
			{/each}
		</Container>
	{/each}
{/snippet}

<Container class="documentation-shell" id="documentation-page-layout">
	<!-- Mobile Drawer -->
	<Drawer
		bind:isOpen={globalState.isDocumentationDrawerOpen}
		position="left"
		transitionFn={fly}
		transitionParams={{ x: -300, duration: 250 }}
		backdropTransitionFn={fade}
		backdropTransitionParams={{ duration: 250 }}
	>
		<Container class="documentation-drawer-panel documentation-scroll">
			{@render navigationContent()}
		</Container>
	</Drawer>

	<Container class="documentation-columns" id="documentation-page-two-row">
		<!-- Desktop Sidebar -->
		<Container
			type="aside"
			class="documentation-sidebar documentation-scroll"
			id="documentation-page-sidebar"
		>
			{@render navigationContent()}
		</Container>

		<!-- Content Area -->
		<Container class="documentation-content">
			{@render children()}
		</Container>
	</Container>
</Container>
