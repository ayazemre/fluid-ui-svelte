<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { handlePinInput, handlePinPaste } from '$lib/utilities/pinInput';

	let {
		length = 6,
		value = $bindable(''),
		type = 'number',
		disabled = false,
		variant = '',
		componentId = crypto.randomUUID(),
		onComplete
	}: {
		length?: number;
		value?: string;
		type?: 'number' | 'text' | 'password';
		disabled?: boolean;
		variant?: string;
		componentId?: string;
		onComplete?: (code: string) => Promise<unknown> | void;
	} = $props();

	let inputElements = $state<HTMLInputElement[]>([]);
	let digits = $state<string[]>([]);

	$effect.pre(() => {
		const nextDigits = Array.from({ length }, (_, index) => value[index] ?? '');
		if (digits.length !== length || digits.join('') !== nextDigits.join('')) {
			digits = nextDigits;
		}
	});

	function syncValue(newDigits: string[]) {
		digits = newDigits;
		const combined = newDigits.join('');
		value = combined;
		if (newDigits.length === length && newDigits.every((digit) => Boolean(digit)) && onComplete) {
			onComplete(combined);
		}
	}

	function handleInput(index: number, event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		const { newValues, nextIndex } = handlePinInput(index, target.value, length, digits);
		syncValue(newValues);

		if (nextIndex !== index) {
			inputElements[nextIndex]?.focus();
		}
	}

	function handleKeyDown(index: number, event: KeyboardEvent) {
		if (event.key === 'Backspace' && !digits[index] && index > 0) {
			inputElements[index - 1]?.focus();
		} else if (event.key === 'ArrowLeft' && index > 0) {
			event.preventDefault();
			inputElements[index - 1]?.focus();
		} else if (event.key === 'ArrowRight' && index < length - 1) {
			event.preventDefault();
			inputElements[index + 1]?.focus();
		}
	}

	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const pastedText = event.clipboardData?.getData('text') ?? '';
		const newDigits = handlePinPaste(pastedText, length);
		syncValue(newDigits);
		const lastFilledIndex = Math.min(length - 1, pastedText.trim().length);
		inputElements[lastFilledIndex]?.focus();
	}
</script>

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-pin-input-container flex items-center gap-2',
		disabled ? 'cursor-not-allowed opacity-50' : '',
		variant ? `fluid-pin-input-${variant}` : '',
		variant
	)}
>
	{#each Array.from({ length }) as _, index (index)}
		<input
			bind:this={inputElements[index]}
			type={type === 'password' ? 'password' : 'text'}
			inputmode={type === 'number' ? 'numeric' : 'text'}
			pattern={type === 'number' ? '[0-9]*' : undefined}
			maxlength={1}
			value={digits[index] ?? ''}
			{disabled}
			aria-label={`Digit ${index + 1} of ${length}`}
			oninput={(event) => handleInput(index, event)}
			onkeydown={(event) => handleKeyDown(index, event)}
			onpaste={handlePaste}
			class={mergeClasses(
				'fluid-pin-input-cell h-11 w-11 rounded-md border border-border bg-surface-raised text-center font-mono text-lg font-semibold text-content shadow-xs transition-all focus:border-primary-500 focus:outline-2 focus:outline-primary-500 disabled:cursor-not-allowed',
				variant ? `fluid-pin-input-cell-${variant}` : ''
			)}
		/>
	{/each}
</Container>
