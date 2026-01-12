<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';

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

<Container
	id={componentId}
	class={mergeClasses(variant, 'fluid-code-block-container flex flex-col overflow-scroll')}
>
	{#each code.split('\n') as line, index}
		<Container class={mergeClasses(variant, 'fluid-code-block-row flex items-start')}>
			{#if showLineNumbers}
				<Container
					class={mergeClasses(variant, 'fluid-code-block-index sticky left-0 z-1 min-w-10 px-2')}
				>
					<Text class="select-none">{index}</Text>
				</Container>
			{/if}
			<Container class={mergeClasses(variant, 'fluid-code-block-content flex flex-1 flex-col')}>
				<Text type="pre">
					<Text type="code" class={'language-' + language}>{line}</Text>
				</Text>
			</Container>
		</Container>
	{/each}
</Container>
