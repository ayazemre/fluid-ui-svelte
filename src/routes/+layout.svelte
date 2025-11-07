<script lang="ts">
	import '../app.css';
	import Container from '../lib/base/Container.svelte';
	import Text from '../lib/base/Text.svelte';
	import Image from '../lib/base/Image.svelte';
	import Link from '../lib/base/Link.svelte';

	let { children } = $props();
</script>

<Container class="flex min-h-screen w-full flex-col" id="global-layout">
	<Container
		type="nav"
		class="flex w-full justify-between p-4 opacity-100 shadow-2xl"
		id="navigation-bar"
	>
		<Link href="/">
			<Container class="flex" id="branding-block">
				<Container class="size-16">
					<Image
						id="fluid-ui-logo"
						src="https://picsum.photos/200/300"
						alt="Fluid UI"
						class="bg-black-500 size-full rounded-full object-cover"
					></Image>
				</Container>
				<Text value="Fluid UI"></Text>
			</Container>
		</Link>

		<Container id="navigation-links-block">
			<Link href="/documentation/introduction">
				<Text value="Documentation"></Text>
			</Link>
			<img src="" alt="GitHub" />
		</Container>
	</Container>
	<Container class="flex flex-1 flex-col ">
		{@render children()}
	</Container>
</Container>
