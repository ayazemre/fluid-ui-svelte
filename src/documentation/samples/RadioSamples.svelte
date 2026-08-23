<script lang="ts">
	import { Radio } from '$lib/base';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let selectedContactMethod = $state('email');
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Radio Samples</Text>
		<Text class="text-neutral-500">
			A control that allows users to select a single option from a predefined group.
		</Text>
	</Container>

	<!-- 1. Radio Group -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Radio Group</Text>
		<Text class="text-neutral-500">Radio inputs coordinated with group state binding.</Text>
		<Container class="documentation-preview flex w-full flex-col gap-3">
			<Radio
				name="contact"
				value="email"
				bind:group={selectedContactMethod}
				label="Email notifications"
			/>
			<Radio name="contact" value="phone" bind:group={selectedContactMethod} label="Phone calls" />
			<Radio name="contact" value="sms" bind:group={selectedContactMethod} label="SMS messages" />
			<Radio
				name="contact"
				value="carrier-pigeon"
				bind:group={selectedContactMethod}
				disabled
				label="Carrier Pigeon (Unavailable)"
			/>
			<Text class="text-sm text-neutral-500">
				Selected option: <Text type="span" class="font-semibold text-primary-500"
					>{selectedContactMethod}</Text
				>
			</Text>
		</Container>
		<CodeBlock code={codeBlockContents.radioBasic} language="svelte" />
	</Container>
</Container>
