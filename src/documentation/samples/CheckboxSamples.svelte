<script lang="ts">
	import { Checkbox } from '$lib/base';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let isTermsAccepted = $state(false);
	let isNewsletterSubscribed = $state(true);
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Checkbox Samples</Text>
		<Text class="text-neutral-500">
			A control that allows users to select one or more items from a set.
		</Text>
	</Container>

	<!-- 1. Basic Checkboxes -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Basic Checkboxes</Text>
		<Text class="text-neutral-500">Accessible form checkboxes with bindable state and labels.</Text>
		<Container class="documentation-preview flex w-full flex-col gap-3">
			<Checkbox bind:checked={isTermsAccepted} label="Accept Terms and Conditions" />
			<Checkbox bind:checked={isNewsletterSubscribed} label="Subscribe to newsletter updates" />
			<Text class="text-sm text-neutral-500">
				Terms accepted: {isTermsAccepted ? 'Yes' : 'No'} | Newsletter: {isNewsletterSubscribed
					? 'Yes'
					: 'No'}
			</Text>
		</Container>
		<CodeBlock code={codeBlockContents.checkboxBasic} language="svelte" />
	</Container>

	<!-- 2. Indeterminate and Disabled -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Indeterminate and Disabled States</Text>
		<Text class="text-neutral-500">Useful for hierarchical item selection and disabled inputs.</Text
		>
		<Container class="documentation-preview flex w-full flex-col gap-3">
			<Checkbox indeterminate={true} label="Select All (Partially Selected)" />
			<Checkbox disabled checked={true} label="Disabled checked" />
			<Checkbox disabled checked={false} label="Disabled unchecked" />
		</Container>
		<CodeBlock code={codeBlockContents.checkboxIndeterminate} language="svelte" />
	</Container>
</Container>
