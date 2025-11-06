<script lang="ts">
	import '../app.css';
	import Container from '../lib/base/Container.svelte';
	import Text from '../lib/base/Text.svelte';
	import Image from '../lib/base/Image.svelte';

	let { children } = $props();
</script>

<Container class="flex size-full flex-col">
	<Container type="nav" class="flex w-full justify-between p-4 opacity-100 shadow-2xl">
		<Container class="flex">
			<Container class="size-16">
				<Image
					src="https://picsum.photos/200/300"
					alt="Fluid UI"
					class="bg-black-500 size-full rounded-full object-cover"
				></Image>
			</Container>
			<Text value="Fluid UI"></Text>
		</Container>

		<Container>
			<Text value="Documentation"></Text>
			<img src="" alt="GitHub" />
		</Container>
	</Container>
	{@render children()}
</Container>
