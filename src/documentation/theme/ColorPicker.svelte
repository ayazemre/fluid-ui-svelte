<script lang="ts">
	import { Popover } from '$lib/components';
	import { Container, InputField, Text } from '$lib/base';
	import { hexToOklch, oklchToHex, isHex, type Oklch } from './color';

	let {
		value,
		label = 'Choose colour',
		maxChroma = 0.3,
		position = 'bottom',
		onchange
	}: {
		value: string;
		label?: string;
		maxChroma?: number;
		position?: 'top' | 'bottom' | 'left' | 'right';
		onchange?: (hex: string) => void;
	} = $props();

	const oklch = $derived(hexToOklch(isHex(value) ? value : '#000000'));

	/** Single funnel: every control edits the actual 500-stop anchor. */
	const commit = (next: Oklch) =>
		onchange?.(oklchToHex({ ...next, c: Math.min(next.c, maxChroma) }));

	const hueTrack = `linear-gradient(to right in oklch, ${Array.from(
		{ length: 13 },
		(_, index) => `oklch(0.65 0.15 ${index * 30})`
	).join(', ')})`;
	const chromaTrack = $derived(
		`linear-gradient(to right in oklch, oklch(${oklch.l} 0 ${oklch.h}), oklch(${oklch.l} ${maxChroma} ${oklch.h}))`
	);
	const lightnessTrack = $derived(
		`linear-gradient(to right in oklch, oklch(0 ${oklch.c} ${oklch.h}), oklch(1 ${oklch.c} ${oklch.h}))`
	);

	let hexDraft = $derived(value);
</script>

<Popover {position} variant="theme-color-picker">
	{#snippet trigger()}
		<span class="theme-color-picker-swatch" style={`background:${value}`}>
			<span class="sr-only">{label}</span>
		</span>
	{/snippet}
	{#snippet content()}
		<Container class="theme-color-picker-panel" style={`--picker-thumb:${value}`}>
			<label class="theme-color-picker-control">
				<Text type="span" class="theme-color-picker-label">Hue</Text>
				<input
					class="theme-color-picker-range"
					type="range"
					value={oklch.h}
					min={0}
					max={359}
					step={1}
					style={`--picker-track:${hueTrack}`}
					oninput={(event) => commit({ ...oklch, h: Number(event.currentTarget.value) })}
				/>
			</label>
			<label class="theme-color-picker-control">
				<Text type="span" class="theme-color-picker-label">Chroma</Text>
				<input
					class="theme-color-picker-range"
					type="range"
					value={Math.min(oklch.c, maxChroma)}
					min={0}
					max={maxChroma}
					step={0.001}
					style={`--picker-track:${chromaTrack}`}
					oninput={(event) => commit({ ...oklch, c: Number(event.currentTarget.value) })}
				/>
			</label>
			<label class="theme-color-picker-control">
				<Text type="span" class="theme-color-picker-label">Lightness</Text>
				<input
					class="theme-color-picker-range"
					type="range"
					value={oklch.l}
					min={0.05}
					max={0.95}
					step={0.001}
					style={`--picker-track:${lightnessTrack}`}
					oninput={(event) => commit({ ...oklch, l: Number(event.currentTarget.value) })}
				/>
			</label>
			<InputField
				class="theme-color-picker-hex"
				value={hexDraft}
				aria-label="Colour as hex"
				oninput={(event) => {
					const draft = (event.currentTarget as HTMLInputElement).value;
					hexDraft = draft;
					if (isHex(draft)) {
						commit(hexToOklch(draft));
					}
				}}
			/>
		</Container>
	{/snippet}
</Popover>
