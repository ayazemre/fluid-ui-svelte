<script lang="ts">
	import { Container, Button, Text, Link } from '$lib/base';
	import { Page } from '$lib/components';
	import Icon from '@iconify/svelte';
	import { componentRegistry } from '../documentation/registry';

	const toRegistryEntries = (registryGroup: Record<string, { title: string }>, category: string) =>
		Object.entries(registryGroup)
			.map(([slug, registryEntry]) => ({
				name: registryEntry.title.replace('Fluid UI - ', ''),
				url: `/documentation/${category}/${slug}`
			}))
			.sort((first, second) => first.name.localeCompare(second.name));

	const baseEntries = toRegistryEntries(componentRegistry.base, 'base');
	const componentEntries = toRegistryEntries(componentRegistry.components, 'components');

	const braces = { open: '{', close: '}' };
	const backgroundSwatches = ['#2f5bff', '#0f9d76', '#d24b2e', '#7c3aed', '#0c0e14'];
	const installCommand = 'npm install fluid-ui-svelte';

	let backgroundColor = $state('#2f5bff');
	let borderRadius = $state(6);
	let isInstallCommandCopied = $state(false);

	async function copyInstallCommand() {
		await navigator.clipboard.writeText(installCommand);
		isInstallCommandCopied = true;
		setTimeout(() => (isInstallCommandCopied = false), 2000);
	}
</script>

<Page
	class="documentation-landing"
	title="Fluid UI"
	description="Fluid UI is a Svelte 5 component library that ships components, not a theme. One stylesheet lives in your project — edit it and every component follows."
>
	<!-- Hero -->
	<Container class="documentation-hero">
		<Container class="documentation-hero-grid">
			<Container class="documentation-hero-column">
				<Text type="h1" class="documentation-hero-title">
					The styles live<br />in your repo.
				</Text>
				<Text class="documentation-hero-lede">
					Fluid UI ships components, not a theme. One stylesheet goes into your project — edit it
					there and every component follows. Nothing is injected at runtime.
				</Text>

				<Container class="documentation-install">
					<Text class="documentation-label">Install</Text>
					<Container class="documentation-install-command">
						<Text type="span" class="documentation-label">$</Text>
						<Text type="code" class="documentation-strong documentation-monospace"
							>{installCommand}</Text
						>
						<Button
							aria-label="Copy the install command"
							onclick={async () => await copyInstallCommand()}
							class="documentation-icon-button"
						>
							<Icon
								icon={isInstallCommandCopied ? 'ph:check-bold' : 'ph:copy'}
								class="documentation-icon-small"
							/>
						</Button>
					</Container>
				</Container>

				<Container class="documentation-hero-actions">
					<Link href="/documentation/getting-started" class="documentation-hero-action">
						Read the documentation
						<Icon icon="ph:arrow-right" class="documentation-arrow" />
					</Link>
					<Link
						href="https://github.com/ayazemre/fluid-ui-svelte"
						target="_blank"
						class="documentation-hero-action"
					>
						<Icon icon="akar-icons:github-fill" class="documentation-icon-small" />
						Source
					</Link>
				</Container>
			</Container>

			<!-- Editable stylesheet -->
			<Container class="documentation-stylesheet">
				<Container class="documentation-stylesheet-header">
					<Text type="span" class="documentation-label documentation-strong">fluidui.css</Text>
					<Text type="span" class="documentation-label">yours to edit</Text>
				</Container>

				<Container class="documentation-stylesheet-body">
					<Text type="span" class="documentation-strong documentation-monospace"
						>.fluid-button-primary <Text type="span" class="documentation-monospace"
							>{braces.open}</Text
						></Text
					>

					<Container class="documentation-declaration">
						<Text type="span" class="documentation-monospace"
							>background: <Text type="span" class="documentation-editable documentation-monospace"
								>{backgroundColor}</Text
							>;</Text
						>
						<Container class="documentation-swatches">
							{#each backgroundSwatches as swatch (swatch)}
								<Button
									overrideDefaultStyling
									aria-label={'Set background to ' + swatch}
									aria-pressed={backgroundColor === swatch}
									onclick={async () => {
										backgroundColor = swatch;
									}}
									class={'documentation-swatch' + (backgroundColor === swatch ? ' selected' : '')}
									style={'background:' + swatch}
								>
									<Text type="span" class="sr-only">{swatch}</Text>
								</Button>
							{/each}
						</Container>
					</Container>

					<Container class="documentation-declaration">
						<Text type="span" class="documentation-monospace"
							>border-radius: <Text
								type="span"
								class="documentation-editable documentation-monospace">{borderRadius}px</Text
							>;</Text
						>
						<input
							type="range"
							min="0"
							max="20"
							bind:value={borderRadius}
							aria-label="Border radius in pixels"
							class="documentation-range"
						/>
					</Container>

					<Text type="span" class="documentation-monospace">{braces.close}</Text>
				</Container>

				<Container class="documentation-stylesheet-preview">
					<Button
						onclick={async () => {}}
						class="documentation-live-button"
						style={'background:' + backgroundColor + '; border-radius:' + borderRadius + 'px'}
					>
						Primary button
					</Button>
					<Text class="documentation-label">every component follows the file</Text>
				</Container>
			</Container>
		</Container>
	</Container>

	<!-- Two layers -->
	<Container class="documentation-section">
		<Container class="documentation-section-inner">
			<Text type="h2" class="documentation-section-title">Two layers, two imports.</Text>

			<Container class="documentation-layers">
				<Container class="documentation-layer">
					<Text type="code" class="documentation-inline-code documentation-layer-import"
						>fluid-ui-svelte/base</Text
					>
					<Text class="documentation-body">
						Thin wrappers over HTML elements. They keep markup semantic and accessible and hand
						every styling decision back to you.
					</Text>
					<Container class="documentation-index">
						{#each baseEntries as registryEntry (registryEntry.url)}
							<Link
								href={registryEntry.url}
								class="documentation-index-link documentation-monospace">{registryEntry.name}</Link
							>
						{/each}
					</Container>
				</Container>

				<Container class="documentation-layer">
					<Text type="code" class="documentation-inline-code documentation-layer-import"
						>fluid-ui-svelte/components</Text
					>
					<Text class="documentation-body">
						Interactive elements composed from the base layer. Keyboard handling, focus and state
						are solved; the appearance still comes from your stylesheet.
					</Text>
					<Container class="documentation-index">
						{#each componentEntries as registryEntry (registryEntry.url)}
							<Link
								href={registryEntry.url}
								class="documentation-index-link documentation-monospace">{registryEntry.name}</Link
							>
						{/each}
					</Container>
				</Container>
			</Container>
		</Container>
	</Container>

	<!-- Footer -->
	<Container type="footer" class="documentation-footer">
		<Container class="documentation-footer-inner">
			<Text class="documentation-label">{'Fluid UI · MIT · ' + new Date().getFullYear()}</Text>
			<Container class="documentation-footer-links">
				<Link href="/documentation/getting-started">Documentation</Link>
				<Link href="/fluidui.css" target="_blank">fluidui.css</Link>
				<Link href="https://github.com/ayazemre/fluid-ui-svelte" target="_blank">GitHub</Link>
			</Container>
		</Container>
	</Container>
</Page>
