<script lang="ts">
	import { Page, Switch, Accordion } from '$lib/components';
	import { Text, Container, Button, InputField, Table, Link } from '$lib/base';
	import { themeStore, presets } from '../../../documentation/theme/themeState.svelte';
	import {
		colorRoles,
		radiusOptions,
		roleLabels,
		themeToFluidCss,
		themeToCss,
		buildRamps,
		type RadiusId
	} from '../../../documentation/theme/theme';
	import { rampStops, oklchToHex } from '../../../documentation/theme/color';
	import ColorPicker from '../../../documentation/theme/ColorPicker.svelte';
	import fluidUiCss from '../../../fluidui.css?raw';

	type ExportMode = 'full' | 'override';

	const theme = $derived(themeStore.current);
	const ramps = $derived(buildRamps(theme));

	let exportMode = $state<ExportMode>('full');
	let copied = $state(false);
	let previewChecked = $state(true);

	const generatedCss = $derived(
		exportMode === 'full' ? themeToFluidCss(theme, fluidUiCss) : themeToCss(theme)
	);
	const exportFileName = $derived(
		exportMode === 'full'
			? 'fluidui.css'
			: `${theme.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'fluid'}-theme.css`
	);

	const selectExportMode = (mode: ExportMode) => {
		exportMode = mode;
		copied = false;
	};

	const copyCss = async () => {
		await navigator.clipboard.writeText(generatedCss);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	};

	const downloadCss = () => {
		const file = new Blob([generatedCss], { type: 'text/css;charset=utf-8' });
		const objectUrl = URL.createObjectURL(file);
		const downloadLink = document.createElement('a');
		downloadLink.href = objectUrl;
		downloadLink.download = exportFileName;
		downloadLink.click();
		setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
	};
</script>

<Page
	class="documentation-page"
	title="Fluid UI - Theme editor"
	description="Build a Fluid UI theme in the browser. Pick base colours and a radius, watch the whole site restyle, then take the generated CSS."
>
	<Container class="documentation-stack">
		<Container class="documentation-block">
			<Text class="documentation-label">Guides</Text>
			<Text type="h1" class="documentation-page-title">Theme editor</Text>
			<Text class="documentation-lede">
				Every colour and radius in Fluid UI is a CSS custom property, so a theme is just a set of
				values — no build step, no runtime. Change one below and the entire documentation site
				restyles with it, because the site is running the same stylesheet you are about to download.
			</Text>
		</Container>

		<Container class="theme-editor-grid">
			<Container class="documentation-block">
				<Text type="h2" class="documentation-subtitle">Presets</Text>
				<Container class="theme-preset-row">
					{#each presets as preset (preset.name)}
						<Button
							onclick={async () => themeStore.usePreset(preset)}
							class={'theme-preset' + (theme.name === preset.name ? ' active' : '')}
							aria-label={`Use the ${preset.name} preset`}
						>
							<Container class="theme-preset-swatches">
								{#each ['primary', 'secondary', 'tertiary'] as const as role (role)}
									<span class="theme-preset-swatch" style={`background:${preset.colors[role]}`}
									></span>
								{/each}
							</Container>
							<Text type="span" class="theme-preset-name">{preset.name}</Text>
						</Button>
					{/each}
				</Container>
			</Container>

			<Container class="documentation-block">
				<Text type="h2" class="documentation-subtitle">Base colours</Text>
				<Text class="documentation-body">
					Each base colour is the exact 500 stop. Fluid builds the lighter and darker stops around
					that anchor in OKLCH.
				</Text>
				<Container class="theme-role-list">
					{#each colorRoles as role (role)}
						<Container class="theme-role">
							<Text type="span" class="theme-role-label">{roleLabels[role]}</Text>
							<Container class="theme-role-controls">
								<ColorPicker
									value={theme.colors[role]}
									label={`Choose ${roleLabels[role].toLowerCase()} colour`}
									maxChroma={role === 'neutral' ? 0.02 : 0.3}
									onchange={(hex) => themeStore.setColor(role, hex)}
								/>
								<Text type="code" class="documentation-inline-code">{theme.colors[role]}</Text>
							</Container>
							<Container class="theme-ramp">
								{#each rampStops as stop (stop)}
									<span
										class="theme-ramp-stop"
										title={`${role}-${stop}`}
										style={`background:${oklchToHex(ramps[role][stop])}`}
									></span>
								{/each}
							</Container>
						</Container>
					{/each}
				</Container>
			</Container>

			<Container class="documentation-block">
				<Text type="h2" class="documentation-subtitle">Border radius</Text>
				<Container class="theme-radius-row">
					{#each radiusOptions as option (option.id)}
						<Button
							onclick={async () => themeStore.setRadius(option.id as RadiusId)}
							class={'theme-radius' + (theme.radius === option.id ? ' active' : '')}
						>
							<span class="theme-radius-sample" style={`border-radius:${option.base}rem`}></span>
							<Text type="span">{option.label}</Text>
						</Button>
					{/each}
				</Container>
			</Container>
		</Container>

		<Container class="documentation-block">
			<Text type="h2" class="documentation-subtitle">Live preview</Text>
			<Text class="documentation-body">
				These are the real components, reading the real tokens. Toggle dark mode in the navigation
				bar to check both sides of your theme. Accent foregrounds choose the more readable end of
				the neutral ramp automatically.
			</Text>
			<Container class="documentation-preview theme-preview">
				<Container class="theme-preview-row">
					<Button onclick={async () => {}} class="fluid-button-primary">Primary</Button>
					<Button onclick={async () => {}} class="fluid-button-secondary">Secondary</Button>
					<Button onclick={async () => {}} class="fluid-button-outline">Outline</Button>
					<Button onclick={async () => {}} class="fluid-button-transparent">Transparent</Button>
				</Container>

				<Container class="theme-preview-row">
					<InputField placeholder="Input field" />
					<InputField placeholder="Invalid input" class="fluid-input-field-error" />
					<Switch bind:checked={previewChecked} onclick={async () => {}} />
				</Container>

				<Accordion>
					{#snippet header()}
						<Text>Accordion header</Text>
					{/snippet}
					{#snippet body()}
						<Text>Surfaces, borders and text all follow the neutral ramp.</Text>
					{/snippet}
				</Accordion>

				<Table
					caption="Token usage"
					tableHeadItems={['Role', 'Stop', 'Usage']}
					tableRowItems={[
						['primary', '500', 'Buttons and controls'],
						['on-primary', '50 / 950', 'Readable accent foreground'],
						['neutral', '50 / 900', 'Page surface'],
						['error', '500', 'Validation state']
					]}
					tableFooterItems={['4 roles', '', '']}
				>
					{#snippet headTemplate(item: string)}
						{item}
					{/snippet}
					{#snippet bodyTemplate(item: string)}
						{item}
					{/snippet}
					{#snippet footerTemplate(item: string)}
						<span class="font-bold">{item}</span>
					{/snippet}
				</Table>

				<Container class="theme-preview-row">
					{#each ['success', 'warning', 'info', 'error'] as const as status (status)}
						<span class={`theme-status theme-status-${status}`}>{roleLabels[status]}</span>
					{/each}
				</Container>
			</Container>
		</Container>

		<Container class="documentation-block">
			<Text type="h2" class="documentation-subtitle">Your stylesheet</Text>
			<Text class="documentation-body">
				Choose the complete Fluid source file for a new project, or the smaller theme override if
				you already keep <Link href="/fluidui.css" target="_blank">fluidui.css</Link> locally.
			</Text>
			<Container class="theme-export-options" role="group" aria-label="Stylesheet type">
				<Button
					onclick={async () => selectExportMode('full')}
					aria-pressed={exportMode === 'full'}
					class="theme-export-option"
				>
					<Text type="span" class="theme-export-option-title">Full Fluid CSS</Text>
					<Text type="span" class="theme-export-option-detail"
						>Complete source with every .fluid-* rule</Text
					>
				</Button>
				<Button
					onclick={async () => selectExportMode('override')}
					aria-pressed={exportMode === 'override'}
					class="theme-export-option"
				>
					<Text type="span" class="theme-export-option-title">Theme override</Text>
					<Text type="span" class="theme-export-option-detail"
						>Tokens only; imports your existing fluidui.css</Text
					>
				</Button>
			</Container>
			<Text class="documentation-body theme-export-guidance">
				{exportMode === 'full'
					? 'Save this as src/fluidui.css and import it from your app stylesheet. It is Tailwind CSS 4 source and includes all Fluid component styles.'
					: 'Save this beside fluidui.css and import the theme file. Its generated tokens override the canonical component stylesheet.'}
			</Text>
			<Container class="theme-export-actions">
				<Button onclick={copyCss} class="fluid-button-primary">
					{copied ? 'Copied' : exportMode === 'full' ? 'Copy full CSS' : 'Copy override'}
				</Button>
				<Button onclick={async () => downloadCss()} class="fluid-button-secondary"
					>Download {exportFileName}</Button
				>
				<Button onclick={async () => themeStore.reset()} class="fluid-button-outline">Reset</Button>
			</Container>
			<textarea
				class="theme-export-code"
				value={generatedCss}
				readonly
				wrap="off"
				spellcheck="false"
				aria-label={exportMode === 'full'
					? 'Generated full Fluid stylesheet'
					: 'Generated Fluid theme override'}
			></textarea>
		</Container>

		<Container class="documentation-next">
			<Text class="documentation-label">Next</Text>
			<Link href="/documentation/getting-started" class="documentation-next-link"
				>Install Fluid UI →</Link
			>
			<Text class="documentation-body">Add the package and the stylesheet to your project.</Text>
		</Container>
	</Container>
</Page>
