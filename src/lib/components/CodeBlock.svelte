<script lang="ts">
	import { Button } from '$lib/base/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		code = `export function inputFilter(event: InputEvent, keys: Array<string>) {
	const element = event.target as HTMLInputElement;
	if (event.data) {
		if (event.inputType == 'insertText' || event.inputType == 'insertFromPaste') {
			element.value = element.value
				.split('')
				.filter((char) => keys.includes(char))
				.join('');
		}
	}
}
`,
		lang = 'Typescript',
		class: className = '',
		...rest
	}: {
		code?: string;
		lang?: string;
		class?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();

	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout>;

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
</script>

<div class="fluid-code-block group relative {className}" {...rest}>
	<div
		class="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100"
	>
		<Button
			class="bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md p-1.5 hover:text-white"
			onclick={handleCopy}
		>
			{#if copied}
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			{:else}
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
			{/if}
		</Button>
	</div>
	<pre class="bg-gray-800 flex overflow-x-auto rounded-lg p-4 text-sm"><div
			class="text-gray-500 flex-none pr-4 text-right select-none">
			{#each code.split('\n') as _, i}
				<div>{i + 1}</div>
			{/each}
		</div><code class="language-{lang} flex-auto">{code}</code></pre>
</div>
