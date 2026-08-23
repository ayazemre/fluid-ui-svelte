<script lang="ts">
	import { Button, Container, Text } from '$lib/base';
	import { ContextMenu, CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let lastAction = $state('');
</script>

<Container class="flex flex-col gap-6">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Right-Click Context Menu</Text>
		<Container class="flex flex-col gap-3">
			<ContextMenu>
				{#snippet trigger()}
					<Container
						class="flex h-36 w-full max-w-md items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface-raised p-6 text-center select-none"
					>
						<Text type="p" class="text-sm text-content-muted">
							Right-click inside this zone to open contextual menu
						</Text>
					</Container>
				{/snippet}

				{#snippet menu({ close })}
					<Container class="flex min-w-[140px] flex-col gap-0.5">
						<Button
							onclick={async () => {
								lastAction = 'Edit';
								close();
							}}
							overrideDefaultStyling
							class="w-full cursor-pointer rounded px-3 py-1.5 text-left text-xs text-content hover:bg-surface-hover"
						>
							Edit
						</Button>
						<Button
							onclick={async () => {
								lastAction = 'Duplicate';
								close();
							}}
							overrideDefaultStyling
							class="w-full cursor-pointer rounded px-3 py-1.5 text-left text-xs text-content hover:bg-surface-hover"
						>
							Duplicate
						</Button>
						<Button
							onclick={async () => {
								lastAction = 'Delete';
								close();
							}}
							overrideDefaultStyling
							class="w-full cursor-pointer rounded px-3 py-1.5 text-left text-xs text-error-600 hover:bg-error-50 dark:hover:bg-error-950/30"
						>
							Delete
						</Button>
					</Container>
				{/snippet}
			</ContextMenu>

			{#if lastAction}
				<Text type="p" class="text-xs text-content-muted">
					Last clicked action: <Text type="span" class="font-semibold text-primary-500"
						>{lastAction}</Text
					>
				</Text>
			{/if}
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.contextMenuBasic} language="svelte" />
		</Container>
	</Container>
</Container>
