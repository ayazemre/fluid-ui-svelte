<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';

	let {
		value = undefined,
		max = 100,
		showValue = false,
		variant = '',
		componentId = crypto.randomUUID()
	}: {
		value?: number;
		max?: number;
		showValue?: boolean;
		variant?: string;
		componentId?: string;
	} = $props();

	const isIndeterminate = $derived(value === undefined);
	const percentage = $derived(
		value !== undefined ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0
	);
</script>

<Container
	id={componentId}
	class={mergeClasses('fluid-progress-wrapper flex w-full flex-col gap-1', variant)}
>
	{#if showValue && !isIndeterminate}
		<Container class="fluid-progress-header flex items-center justify-between text-xs">
			<Text type="span" class="fluid-progress-label">Progress</Text>
			<Text type="span" class="fluid-progress-value font-medium">{percentage}%</Text>
		</Container>
	{/if}

	<Container
		role="progressbar"
		aria-valuenow={isIndeterminate ? undefined : value}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuetext={isIndeterminate ? 'Loading' : `${percentage}%`}
		class={mergeClasses(
			'fluid-progress-track relative h-2 w-full overflow-hidden rounded-full',
			variant ? `fluid-progress-${variant}` : ''
		)}
	>
		{#if isIndeterminate}
			<Container class="fluid-progress-indeterminate absolute inset-0 h-full w-full" />
		{:else}
			<Container
				class="fluid-progress-bar h-full rounded-full transition-all duration-300 ease-out"
				style={`width: ${percentage}%`}
			/>
		{/if}
	</Container>
</Container>
