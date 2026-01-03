<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Text from '../base/Text.svelte';
	import { mergeClasses } from '$lib/utilities/common.js';

	const {
		variant = '',
		componentId,
		code = '',
		language = '',
		showLineNumbers = true
	}: {
		variant?: string;
		componentId?: string;
		code?: string;
		language?: string;
		showLineNumbers?: boolean;
	} = $props();
</script>

<Container id={componentId} class={mergeClasses(variant, 'fluid-code-block-container')}>
	{#each code.split('\n') as line, index}
		<Container class={mergeClasses(variant, 'fluid-code-block-row')}>
			{#if showLineNumbers}
				<Container class={mergeClasses(variant, 'fluid-code-block-index')}>
					<Text class="select-none">{index}</Text>
				</Container>
			{/if}
			<Container class={mergeClasses(variant, 'fluid-code-block-content')}>
				<Text type="pre">
					<Text type="code" class={'language-' + language}>{line}</Text>
				</Text>
			</Container>
		</Container>
	{/each}
</Container>
