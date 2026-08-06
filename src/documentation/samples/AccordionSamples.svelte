<script lang="ts">
	import { Accordion } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Standard Accordion -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Standard Accordion</Text>
		<Text class="text-sm text-neutral-500">The default look with chevron indicators.</Text>
		<Container class="documentation-preview">
			<Accordion>
				{#snippet header({ isExpanded })}
					<Container class="flex w-full items-center justify-between p-2">
						<Text>General Information</Text>
						<Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
					</Container>
				{/snippet}
				{#snippet body()}
					<Container class="p-4 text-sm text-neutral-600 dark:text-neutral-400">
						Accordions are perfect for grouping content while keeping the interface clean and
						scannable.
					</Container>
				{/snippet}
			</Accordion>
		</Container>
		<CodeBlock code={codeBlockContents.accordionStandard} language="svelte" />
	</Container>

	<!-- Custom Transition -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Custom Transition</Text>
		<Text class="text-sm text-neutral-500">Using different Svelte transitions and durations.</Text>
		<Container class="documentation-preview">
			<Accordion transitionFunction={fade} transitionDuration={500}>
				{#snippet header({ isExpanded })}
					<Container class="flex w-full items-center gap-2 p-2">
						<Text class={isExpanded ? 'font-bold text-primary-500' : ''}>Fade Animation</Text>
					</Container>
				{/snippet}
				{#snippet body()}
					<Container class="p-4 italic">
						This accordion uses a cross-fade transition instead of the default slide.
					</Container>
				{/snippet}
			</Accordion>
		</Container>
		<CodeBlock code={codeBlockContents.accordionCustom} language="svelte" />
	</Container>
</Container>
