<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Text from '../base/Text.svelte';

	const {
		variation,
		code = '',
		language = ''
	}: {
		variation?: string;
		code?: string;
		language?: string;
		overrideDefaultStyling?: boolean;
	} = $props();
</script>

<Container class="fluid-code-block-container">
	{#each code.split('\n') as line, index}
		<Container class="fluid-code-block-row">
			<Container class="fluid-code-block-index">{index}</Container>
			<Container class="fluid-code-block-content">
				<Text type="pre">
					<Text type="code" class={'language-' + language}>{line}</Text>
				</Text>
			</Container>
		</Container>
	{/each}
</Container>
