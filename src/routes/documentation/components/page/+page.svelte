<script lang="ts">
	import { Page, CodeBlock } from '$lib/components/index.js';
	import { Container, Text } from '$lib/base/index.js';
</script>

<Page
	title="Fluid UI - Page"
	description="A layout component that manages document metadata and provides a standard page section wrapper."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Page</Text>
			<Text>
				The Page component is a structural wrapper used to define the main content area of a page.
				It automatically handles document metadata updates (title and description) using Svelte's
				built-in head management and applies standard layout padding and background styles.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4 rounded-lg bg-warning-50 p-6 dark:bg-warning-950/20">
			<Container class="flex items-center gap-2">
				<Text type="h3" class="text-lg font-semibold text-warning-800 dark:text-warning-400"
					>Component is being developed</Text
				>
			</Container>
			<Text class="text-sm text-warning-700 dark:text-warning-300">
				The Page component is currently in active development. While basic functionality is
				available, advanced features like nested head management or layout variants are still being
				refined.
			</Text>
			<Container class="mt-4 flex h-64 flex-col items-center justify-center gap-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-warning-300 dark:text-warning-700"
				>
					<path d="M2 12h20" />
					<path d="M7 2v20" />
					<path d="M12 2v20" />
					<path d="M17 2v20" />
					<path d="M2 7h20" />
					<path d="M2 17h20" />
				</svg>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import { Page } from 'fluid-ui-svelte';
<\/script>

<Page title="Home - My App" description="Welcome to the home page">
  <h1>Content goes here</h1>
</Page>`}
			/>
		</Container>
	</Container>
</Page>
