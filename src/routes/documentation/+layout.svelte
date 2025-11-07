<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Link from '../../lib/base/Link.svelte';
	import Text from '../../lib/base/Text.svelte';
	let { children } = $props();
</script>

<Container class=" flex flex-1 flex-col " id="documentation-page-layout">
	<Container class="flex size-full justify-between opacity-100" id="documentation-page-two-row">
		<Container type="aside" class="flex flex-col gap-4 p-8" id="documentation-page-sidebar">
			<Link href="/documentation/introduction">
				<Text value="Introduction"></Text>
			</Link>
			<Link href="/documentation/base/container">
				<Text value="Base"></Text>
			</Link>
			<Link href="/documentation/introduction">
				<Text value="Components"></Text>
			</Link>
			<Link href="/documentation/introduction">
				<Text value="Helpers"></Text>
			</Link>
		</Container>
		<Container>
			{@render children()}
		</Container>
	</Container>
</Container>
