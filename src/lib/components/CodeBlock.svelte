<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { tokenizeLine } from '$lib/utilities/syntax';

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
	class={mergeClasses(variant, 'fluid-code-block-container flex min-w-0 flex-col')}
>
	{#each code.split('\n') as line, index}
		<Container class={mergeClasses(variant, 'fluid-code-block-row flex min-w-0 items-start')}>
			{#if showLineNumbers}
				<Container class={mergeClasses(variant, 'fluid-code-block-index min-w-10 shrink-0 px-2')}>
					<Text class="select-none">{index}</Text>
				</Container>
			{/if}
			<Container
				class={mergeClasses(variant, 'fluid-code-block-content flex min-w-0 flex-1 flex-col')}
			>
				<Text type="pre" class="w-full break-words whitespace-pre-wrap">
					<Text type="code" class={'language-' + language}
						>{#each tokenizeLine(line, language) as token, tokenIndex (tokenIndex)}<span
								class={'fluid-code-token fluid-code-token-' + token.type}>{token.value}</span
							>{/each}</Text
					>
				</Text>
			</Container>
		</Container>
	{/each}
</Container>
