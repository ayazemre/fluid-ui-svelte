<script lang="ts">
	import { Avatar } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Avatar Samples</Text>
		<Text class="text-neutral-500">
			A visual representation of a user or entity with image and automatic initials fallbacks.
		</Text>
	</Container>

	<!-- 1. Initials Fallback & Sizes -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Initials Fallback & Sizes</Text>
		<Text class="text-neutral-500"
			>Generates clean initials automatically when an image is not provided.</Text
		>
		<Container class="documentation-preview flex w-full items-center gap-4">
			<Avatar name="Emre Ayaz" size="xl" />
			<Avatar name="Sarah Connor" size="lg" />
			<Avatar name="Alex" size="md" />
			<Avatar name="David" size="sm" />
		</Container>
		<CodeBlock code={codeBlockContents.avatarInitials} language="svelte" />
	</Container>

	<!-- 2. Status Indicators -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Status Indicators</Text>
		<Text class="text-neutral-500">Add status badges (online, offline, busy, away).</Text>
		<Container class="documentation-preview flex w-full items-center gap-4">
			<Avatar name="John Doe" size="lg" status="online" />
			<Avatar name="Jane Smith" size="lg" status="away" />
			<Avatar name="Bob Wilson" size="lg" status="busy" />
			<Avatar name="Alice Brown" size="lg" status="offline" />
		</Container>
		<CodeBlock code={codeBlockContents.avatarStatus} language="svelte" />
	</Container>
</Container>
