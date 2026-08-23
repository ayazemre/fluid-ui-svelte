<script lang="ts">
	import { Alert } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Alert Samples</Text>
		<Text class="text-neutral-500">
			Contextual feedback banners used to communicate important messages and status alerts.
		</Text>
	</Container>

	<!-- 1. Basic Alert -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Basic Alert</Text>
		<Text class="text-neutral-500">Informational message with title and description.</Text>
		<Container class="documentation-preview w-full">
			<Alert
				type="info"
				title="Information"
				description="Your account details were updated successfully."
			/>
		</Container>
		<CodeBlock code={codeBlockContents.alertBasic} language="svelte" />
	</Container>

	<!-- 2. Status Variants & Dismissible -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Status Variants & Dismissible</Text>
		<Text class="text-neutral-500"
			>Supports success, warning, error, and info types with optional dismissal.</Text
		>
		<Container class="documentation-preview flex w-full flex-col gap-3">
			<Alert
				type="success"
				title="Payment Received"
				description="Your order #12345 has been confirmed and is being processed."
				dismissible
			/>
			<Alert
				type="warning"
				title="Approaching Storage Limit"
				description="You have used 85% of your available cloud storage capacity."
				dismissible
			/>
			<Alert
				type="error"
				title="Failed to Connect"
				description="Could not establish connection to the remote database server."
				dismissible
			/>
		</Container>
		<CodeBlock code={codeBlockContents.alertVariants} language="svelte" />
	</Container>
</Container>
