<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { calculateSliderPercentage, calculateSliderValue } from '$lib/utilities/slider';

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		showValue = false,
		variant = '',
		componentId = crypto.randomUUID(),
		onchange
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		showValue?: boolean;
		variant?: string;
		componentId?: string;
		onchange?: (value: number) => Promise<unknown> | void;
	} = $props();

	let trackElement = $state<HTMLDivElement | null>(null);
	let isDragging = $state(false);

	const percentage = $derived(calculateSliderPercentage(value, min, max));

	async function updateFromPointer(clientX: number) {
		if (!trackElement || disabled) return;
		const rect = trackElement.getBoundingClientRect();
		const newValue = calculateSliderValue(clientX, rect, min, max, step);
		if (newValue !== value) {
			value = newValue;
			if (onchange) {
				await onchange(newValue);
			}
		}
	}

	function handlePointerDown(event: PointerEvent) {
		if (disabled) return;
		isDragging = true;
		(event.currentTarget as HTMLElement)?.setPointerCapture(event.pointerId);
		updateFromPointer(event.clientX);
	}

	function handlePointerMove(event: PointerEvent) {
		if (isDragging) {
			updateFromPointer(event.clientX);
		}
	}

	function handlePointerUp(event: PointerEvent) {
		if (isDragging) {
			isDragging = false;
			(event.currentTarget as HTMLElement)?.releasePointerCapture(event.pointerId);
		}
	}

	async function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;
		let newValue = value;

		if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
			event.preventDefault();
			newValue = Math.min(max, value + step);
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
			event.preventDefault();
			newValue = Math.max(min, value - step);
		} else if (event.key === 'PageUp') {
			event.preventDefault();
			newValue = Math.min(max, value + step * 10);
		} else if (event.key === 'PageDown') {
			event.preventDefault();
			newValue = Math.max(min, value - step * 10);
		} else if (event.key === 'Home') {
			event.preventDefault();
			newValue = min;
		} else if (event.key === 'End') {
			event.preventDefault();
			newValue = max;
		}

		if (newValue !== value) {
			value = Number(newValue.toFixed(step.toString().split('.')[1]?.length ?? 0));
			if (onchange) {
				await onchange(value);
			}
		}
	}
</script>

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-slider-container flex w-full flex-col gap-1.5 select-none',
		disabled ? 'cursor-not-allowed opacity-50' : '',
		variant ? `fluid-slider-${variant}` : '',
		variant
	)}
>
	{#if showValue}
		<Container
			class="fluid-slider-header flex items-center justify-between text-xs text-content-muted"
		>
			<Text type="span">Value</Text>
			<Text type="span" class="font-semibold text-content">{value}</Text>
		</Container>
	{/if}

	<div
		bind:this={trackElement}
		role="slider"
		tabindex={disabled ? -1 : 0}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
		aria-disabled={disabled}
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onkeydown={handleKeyDown}
		class={mergeClasses(
			'fluid-slider-track relative flex h-6 w-full cursor-pointer touch-none items-center focus:outline-none',
			disabled ? 'cursor-not-allowed' : ''
		)}
	>
		<!-- Background rail -->
		<Container class="h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
			<!-- Active fill -->
			<Container class="fluid-slider-fill h-full rounded-full" style={`width: ${percentage}%`} />
		</Container>

		<!-- Thumb knob -->
		<Container
			class={mergeClasses(
				'fluid-slider-thumb absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow transition-transform',
				isDragging ? 'scale-110 ring-4 ring-primary-500/20' : 'hover:scale-105'
			)}
			style={`left: ${percentage}%`}
		/>
	</div>
</Container>
