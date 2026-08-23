<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { Slider, CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let volume = $state(45);
	let stepped = $state(20);
</script>

<Container class="flex flex-col gap-8">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Continuous Slider</Text>
		<Container class="flex max-w-sm flex-col gap-2">
			<Slider bind:value={volume} min={0} max={100} showValue />
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.sliderBasic} language="svelte" />
		</Container>
	</Container>

	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Stepped Slider (Step = 10)</Text>
		<Container class="flex max-w-sm flex-col gap-2">
			<Slider bind:value={stepped} min={0} max={100} step={10} showValue />
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.sliderStep} language="svelte" />
		</Container>
	</Container>
</Container>
