<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Text from '../base/Text.svelte';

	const {
		variation,
		code = '',
		language = '',
		showLineNumbers = true
	}: {
		variation?: string;
		code?: string;
		language?: string;
		showLineNumbers?: boolean;
	} = $props();
</script>

<Container class="fluid-code-block-container">
	{#each code.split('\n') as line, index}
		<Container class="fluid-code-block-row">
			{#if showLineNumbers}
				<Container class="fluid-code-block-index"
					><Text class="select-none">{index}</Text></Container
				>
			{/if}
			<Container class="fluid-code-block-content">
				<Text type="pre">
					<Text type="code" class={'language-' + language}>{line}</Text>
				</Text>
			</Container>
		</Container>
	{/each}
</Container>
