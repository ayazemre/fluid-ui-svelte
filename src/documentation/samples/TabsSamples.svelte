<script lang="ts">
	import { Tabs } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let activeHorizontalTab = $state('account');
	let activeVerticalTab = $state('general');
</script>

{#snippet accountContent()}
	<Container class="flex flex-col gap-2 rounded-md border bg-surface-raised p-4">
		<Text type="h4" class="font-bold">Account Settings</Text>
		<Text class="text-sm text-neutral-500">Manage your profile username and public identity.</Text>
	</Container>
{/snippet}

{#snippet securityContent()}
	<Container class="flex flex-col gap-2 rounded-md border bg-surface-raised p-4">
		<Text type="h4" class="font-bold">Security Settings</Text>
		<Text class="text-sm text-neutral-500"
			>Update your password, two-factor authentication, and sessions.</Text
		>
	</Container>
{/snippet}

{#snippet notificationsContent()}
	<Container class="flex flex-col gap-2 rounded-md border bg-surface-raised p-4">
		<Text type="h4" class="font-bold">Notifications</Text>
		<Text class="text-sm text-neutral-500">Choose email and push notifications preferences.</Text>
	</Container>
{/snippet}

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Tabs Samples</Text>
		<Text class="text-neutral-500">
			Organize content into accessible, switchable panel sections with keyboard navigation support.
		</Text>
	</Container>

	<!-- 1. Horizontal Tabs -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Horizontal Tabs</Text>
		<Text class="text-neutral-500">Standard tab navigation with keyboard arrow navigation.</Text>
		<Container class="documentation-preview w-full">
			<Tabs
				items={[
					{ id: 'account', label: 'Account', content: accountContent },
					{ id: 'security', label: 'Security', content: securityContent },
					{ id: 'notifications', label: 'Notifications', content: notificationsContent },
					{ id: 'advanced', label: 'Advanced (Disabled)', disabled: true }
				]}
				bind:activeTabId={activeHorizontalTab}
			/>
		</Container>
		<CodeBlock code={codeBlockContents.tabsBasic} language="svelte" />
	</Container>

	<!-- 2. Vertical Tabs -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Vertical Tabs</Text>
		<Text class="text-neutral-500">Side-aligned tabs for dense dashboard navigation panels.</Text>
		<Container class="documentation-preview w-full">
			<Tabs
				orientation="vertical"
				items={[
					{ id: 'general', label: 'General', content: accountContent },
					{ id: 'privacy', label: 'Privacy', content: securityContent },
					{ id: 'billing', label: 'Billing', content: notificationsContent }
				]}
				bind:activeTabId={activeVerticalTab}
			/>
		</Container>
		<CodeBlock code={codeBlockContents.tabsVertical} language="svelte" />
	</Container>
</Container>
