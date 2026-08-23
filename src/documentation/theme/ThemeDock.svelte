<script lang="ts">
	import { Container, Text, Button, Link } from '$lib/base';
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import { themeStore, presets } from './themeState.svelte';
	import { colorRoles, radiusOptions, roleLabels, type RadiusId } from './theme';
	import ColorPicker from './ColorPicker.svelte';

	const theme = $derived(themeStore.current);

	let isOpen = $state(false);
</script>

<Container class="theme-dock" id="theme-dock">
	{#if isOpen}
		<Container class="theme-dock-panel" transitionFn={slide} transitionParams={{ duration: 200 }}>
			<Container class="theme-dock-header">
				<Text type="span" class="theme-dock-title">Theme</Text>
				<Button
					onclick={async () => (isOpen = false)}
					class="documentation-icon-button"
					aria-label="Close the theme controls"
				>
					<Icon icon="ph:x-bold" class="documentation-icon-small" />
				</Button>
			</Container>

			<Container class="theme-dock-section">
				<Text type="span" class="theme-dock-label">Preset</Text>
				<Container class="theme-dock-presets">
					{#each presets as preset (preset.name)}
						<Button
							onclick={async () => themeStore.usePreset(preset)}
							class={'theme-dock-preset' + (theme.name === preset.name ? ' active' : '')}
							aria-label={`Use the ${preset.name} preset`}
							title={preset.name}
						>
							<span class="theme-dock-preset-swatch" style={`background:${preset.colors.primary}`}
							></span>
						</Button>
					{/each}
				</Container>
			</Container>

			<Container class="theme-dock-section">
				<Text type="span" class="theme-dock-label">Colours</Text>
				<Container class="theme-dock-colors">
					{#each colorRoles as role (role)}
						<Container class="theme-dock-color">
							<ColorPicker
								value={theme.colors[role]}
								label={`Choose ${roleLabels[role].toLowerCase()} colour`}
								maxChroma={role === 'neutral' ? 0.02 : 0.3}
								position="left"
								onchange={(hex) => themeStore.setColor(role, hex)}
							/>
							<Text type="span" class="theme-dock-color-name">{roleLabels[role]}</Text>
						</Container>
					{/each}
				</Container>
			</Container>

			<Container class="theme-dock-section">
				<Text type="span" class="theme-dock-label">Radius</Text>
				<Container class="theme-dock-radii">
					{#each radiusOptions as option (option.id)}
						<Button
							onclick={async () => themeStore.setRadius(option.id as RadiusId)}
							class={'theme-dock-radius' + (theme.radius === option.id ? ' active' : '')}
							title={option.label}
						>
							<span class="theme-dock-radius-sample" style={`border-radius:${option.base}rem`}
							></span>
						</Button>
					{/each}
				</Container>
			</Container>

			<Container class="theme-dock-footer">
				<Link href="/documentation/theme" overrideDefaultStyling class="theme-dock-link">
					Open editor
					<Icon icon="ph:arrow-up-right" class="documentation-icon-tiny" aria-hidden="true" />
				</Link>
				<Button onclick={async () => themeStore.reset()} class="theme-dock-reset">Reset</Button>
			</Container>
		</Container>
	{/if}

	<Button
		onclick={async () => (isOpen = !isOpen)}
		class="theme-dock-toggle"
		aria-expanded={isOpen}
		aria-controls="theme-dock"
		aria-label={isOpen ? 'Hide the theme controls' : 'Show the theme controls'}
	>
		<Icon icon="ph:palette-bold" class="documentation-icon" />
		<Text type="span" class="theme-dock-toggle-label">{theme.name}</Text>
	</Button>
</Container>
