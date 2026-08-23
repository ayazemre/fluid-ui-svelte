<script lang="ts">
	import { Container, Image, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';

	let {
		src,
		alt = 'Avatar',
		name = '',
		size = 'md',
		status,
		variant = '',
		componentId = crypto.randomUUID()
	}: {
		src?: string;
		alt?: string;
		name?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		status?: 'online' | 'offline' | 'busy' | 'away';
		variant?: string;
		componentId?: string;
	} = $props();

	let hasImageError = $state(false);

	const initials = $derived.by(() => {
		if (!name) return '';
		const words = name.trim().split(/\s+/);
		if (words.length === 1) {
			return words[0].slice(0, 2).toUpperCase();
		}
		return (words[0][0] + words[words.length - 1][0]).toUpperCase();
	});

	const sizeClasses = {
		sm: 'w-8 h-8 text-xs',
		md: 'w-10 h-10 text-sm',
		lg: 'w-12 h-12 text-base',
		xl: 'w-16 h-16 text-lg'
	};

	const statusDotSizes = {
		sm: 'w-2 h-2',
		md: 'w-2.5 h-2.5',
		lg: 'w-3 h-3',
		xl: 'w-3.5 h-3.5'
	};
</script>

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-avatar-container relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-full font-medium select-none',
		sizeClasses[size],
		variant ? `fluid-avatar-${variant}` : '',
		variant
	)}
>
	{#if src && !hasImageError}
		<Image
			{src}
			{alt}
			onerror={() => {
				hasImageError = true;
			}}
			class="fluid-avatar-image h-full w-full rounded-full object-cover"
		/>
	{:else if initials}
		<Container
			class="fluid-avatar-fallback flex h-full w-full items-center justify-center rounded-full"
		>
			<Text type="span" class="fluid-avatar-initials leading-none">{initials}</Text>
		</Container>
	{:else}
		<Container
			class="fluid-avatar-fallback flex h-full w-full items-center justify-center rounded-full text-content-muted"
		>
			<svg class="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path
					d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
				/>
			</svg>
		</Container>
	{/if}

	{#if status}
		<span
			role="status"
			aria-label={`Status: ${status}`}
			class={mergeClasses(
				'fluid-avatar-status absolute right-0 bottom-0 rounded-full',
				statusDotSizes[size],
				`fluid-avatar-status-${status}`,
				variant ? `fluid-avatar-status-${variant}` : ''
			)}
		></span>
	{/if}
</Container>
