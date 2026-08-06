<script lang="ts">
	import '../documentation.css';
	import { Container, Text, Link, Button } from '$lib/base';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { globalState } from './globalState.svelte.js';

	let { children } = $props();

	const navigationLinks = [
		{ label: 'Documentation', href: '/documentation/getting-started', isExternal: false },
		{ label: 'LLM guide', href: '/llm-protocol', isExternal: true }
	];

	const isActiveLink = (href: string) =>
		href === '/documentation/getting-started'
			? page.url.pathname.startsWith('/documentation')
			: page.url.pathname === href;
</script>

<Container
	type="section"
	class={'flex min-h-screen w-full flex-col' + (globalState.darkMode ? ' dark' : '')}
	id="global-layout"
>
	<Container type="nav" class="documentation-navbar" id="navigation-bar">
		<Container class="documentation-navbar-inner">
			<Link href="/" overrideDefaultStyling={true} aria-label="Fluid UI home">
				<Container class="documentation-brand" id="branding-block">
					<svg
						class="documentation-brand-mark"
						viewBox="0 0 32 32"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect x="1" y="1" width="13" height="13" rx="1.5" fill="currentColor" />
						<rect x="18" y="1" width="13" height="13" rx="1.5" fill="currentColor" opacity="0.4" />
						<rect x="1" y="18" width="13" height="13" rx="1.5" fill="currentColor" opacity="0.4" />
						<rect x="18" y="18" width="13" height="13" rx="1.5" fill="currentColor" />
					</svg>
					<Text class="documentation-brand-name">Fluid UI</Text>
					<Text type="span" class="documentation-label">0.3.5</Text>
				</Container>
			</Link>

			<Container class="documentation-navbar-links">
				{#each navigationLinks as navigationLink (navigationLink.href)}
					<Link
						href={navigationLink.href}
						overrideDefaultStyling
						target={navigationLink.isExternal ? '_blank' : undefined}
						rel={navigationLink.isExternal ? 'noopener noreferrer' : undefined}
						class={'documentation-nav-link' + (isActiveLink(navigationLink.href) ? ' active' : '')}
					>
						{navigationLink.label}
					</Link>
				{/each}
			</Container>

			<Container class="documentation-navbar-actions">
				<Button
					aria-label="Open the GitHub repository"
					onclick={async () => {
						window.open('https://github.com/ayazemre/fluid-ui-svelte', '_blank');
					}}
					class="documentation-icon-button"
				>
					<Icon icon="akar-icons:github-fill" class="documentation-icon" />
				</Button>
				<Button
					aria-label={globalState.darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
					onclick={async () => {
						globalState.darkMode = !globalState.darkMode;
					}}
					class="documentation-icon-button"
				>
					<Icon
						icon={globalState.darkMode ? 'ph:sun-bold' : 'ph:moon-bold'}
						class="documentation-icon"
					/>
				</Button>

				{#if page.url.pathname.startsWith('/documentation')}
					<Button
						aria-label="Open the documentation menu"
						onclick={async () => {
							globalState.isDocumentationDrawerOpen = true;
						}}
						class="documentation-icon-button md:hidden!"
					>
						<Icon icon="ph:list-bold" class="documentation-icon" />
					</Button>
				{/if}
			</Container>
		</Container>
	</Container>
	{@render children()}
</Container>
