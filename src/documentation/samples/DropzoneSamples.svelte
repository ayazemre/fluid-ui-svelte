<script lang="ts">
	import { Dropzone, CodeBlock, Draggable } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { codeBlockContents } from './codeBlockContents';

	// File Only State
	let droppedFiles = $state<File[]>([]);

	// Data Only State
	let droppedData = $state('');
</script>

<Container class="flex flex-col gap-12">
	<!-- File Only Dropzone -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">File Dropzone (Copy)</Text>
		<Text class="text-sm text-neutral-500">
			Optimized for file uploads. The cursor indicates a "Copy" operation.
		</Text>

		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Dropzone bind:data={droppedFiles} mode="file" dropEffect="copy">
				{#snippet children({ isDragOver, isInvalid })}
					<Container class="flex flex-col items-center gap-2">
						<Text
							class={isInvalid
								? 'font-bold text-error-600'
								: isDragOver
									? 'font-bold text-primary-600'
									: 'font-medium text-neutral-500'}
						>
							{#if isInvalid}
								You are trying to drop unsupported data
							{:else if isDragOver}
								Drop Files Now
							{:else}
								Drag & Drop Files Here
							{/if}
						</Text>

						{#if droppedFiles.length > 0 && !isDragOver}
							<Container
								class="mt-4 w-full rounded bg-neutral-100 p-2 text-left text-sm dark:bg-neutral-800"
							>
								<Text class="mb-1 font-bold">Dropped Files:</Text>
								<ul class="list-disc pl-4 text-neutral-600 dark:text-neutral-400">
									{#each droppedFiles as file}
										<li>{file.name} ({Math.round(file.size / 1024)} KB)</li>
									{/each}
								</ul>
							</Container>
						{/if}
					</Container>
				{/snippet}
			</Dropzone>
		</Container>

		<CodeBlock code={codeBlockContents.dropzoneFile} language="svelte" />
	</Container>

	<!-- Data Only Dropzone -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Data Dropzone (Move)</Text>
		<Text class="text-sm text-neutral-500">
			Designed for moving text or data between applications. The cursor indicates a "Move"
			operation. This dropzone strictly rejects files.
		</Text>

		<Container
			class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900/50"
		>
			<Container class="mb-6 flex gap-4">
				<Draggable
					variant="primary"
					ondragstart={(e) => e.dataTransfer?.setData('text/plain', 'ID: 12345 - User: Alice')}
				>
					<Text class="text-xs">Drag User Alice</Text>
				</Draggable>
				<Draggable
					variant="secondary"
					ondragstart={(e) => e.dataTransfer?.setData('text/plain', 'ID: 67890 - User: Bob')}
				>
					<Text class="text-xs">Drag User Bob</Text>
				</Draggable>
			</Container>

			<Dropzone bind:data={droppedData} mode="text" dropEffect="move">
				{#snippet children({ isDragOver, isInvalid })}
					<Container class="flex flex-col items-center gap-2">
						<Text
							class={isInvalid
								? 'font-bold text-error-600'
								: isDragOver
									? 'font-bold text-primary-600'
									: 'font-medium text-neutral-500'}
						>
							{#if isInvalid}
								You are trying to drop unsupported data
							{:else if isDragOver}
								Drop Data Now
							{:else}
								Drag Draggable Elements or Text Here
							{/if}
						</Text>

						{#if droppedData && !isDragOver}
							<Container
								class="mt-4 w-full rounded border border-neutral-200 bg-neutral-100 p-2 text-left text-sm dark:border-neutral-700 dark:bg-neutral-800"
							>
								<Text class="mb-1 font-bold text-primary-600">Captured Data:</Text>
								<pre
									class="font-mono whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">{droppedData}</pre>
							</Container>
						{/if}
					</Container>
				{/snippet}
			</Dropzone>
		</Container>

		<CodeBlock code={codeBlockContents.dropzoneData} language="svelte" />
	</Container>
</Container>
