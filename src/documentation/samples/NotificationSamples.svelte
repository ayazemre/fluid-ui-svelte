<script lang="ts">
	import { NotificationArea } from '$lib/components';
	import type { Notification } from '$lib/components/NotificationArea.svelte';
	import { Container, Text, Button } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let notifications = $state<Notification[]>([]);

	function addNotification(type: Notification['type']) {
		notifications = [
			...notifications,
			{
				id: Math.random().toString(36).substring(2, 9),
				message: `This is a ${type} notification message!`,
				type,
				duration: 3000
			}
		];
	}
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Notification Area Samples</Text>
		<Text class="text-neutral-500"
			>A fixed area for displaying non-intrusive notifications and alerts.</Text
		>
	</Container>

	<!-- 1. Interactive Demo -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Interactive Demo</Text>
		<Text class="text-neutral-500">Click buttons to spawn notifications in the area.</Text>
		<Container class="documentation-preview w-full">
			<Container class="flex flex-wrap gap-4">
				<Button onclick={async () => addNotification('info')} class="bg-info-500 text-white"
					>Info</Button
				>
				<Button onclick={async () => addNotification('success')} class="bg-success-500 text-white"
					>Success</Button
				>
				<Button onclick={async () => addNotification('warning')} class="bg-warning-500 text-white"
					>Warning</Button
				>
				<Button onclick={async () => addNotification('error')} class="bg-error-500 text-white"
					>Error</Button
				>
			</Container>

			<NotificationArea bind:items={notifications} position="bottom-right" />
		</Container>
		<CodeBlock code={codeBlockContents.notificationBasic} language="svelte" />
	</Container>
</Container>
