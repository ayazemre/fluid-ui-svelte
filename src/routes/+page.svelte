<script lang="ts">
	import Container from '../lib/base/Container.svelte';
	import Text from '../lib/base/Text.svelte';
	import Accordion from '../lib/components/Accordion.svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '../lib/index.js';
</script>

<Container class="w-64 bg-black">
	<Accordion>
		{#snippet header(options)}
			<Container class="flex w-full items-center justify-between">
				<Text value="Accordion Header"></Text>
				<Icon icon={options.isExpanded ? 'raphael:arrowdown' : 'raphael:arrowright'}></Icon>
			</Container>
		{/snippet}
		{#snippet body()}
			<Container class="flex w-full">
				<Text value="Accordion Body"></Text>
			</Container>
		{/snippet}
	</Accordion>
</Container>
