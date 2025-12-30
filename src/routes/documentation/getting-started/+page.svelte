<script lang="ts">
	import { codeBlockContents } from '$lib/utilities/codeBlockContents.js';
	import { CodeBlock, Page } from '$lib/components/index.js';
	import { Text, Link, Container, List } from '$lib/base/index.js';
</script>

<Page
	title="Fluid UI - Getting Started"
	description="Installation and usage guide for the Fluid UI Svelte component library."
>
	<Container class="flex flex-col gap-10">
		<!-- Introduction -->
		<Container class="flex flex-col gap-4 border-b pb-8 dark:border-neutral-800">
			<Text type="h1" class="text-3xl font-bold">Getting Started</Text>
			<Text class="text-neutral-600 dark:text-neutral-400">
				Fluid UI is a pragmatic Svelte 5 component library designed for flexibility and ease of use.
				It separates low-level semantic wrappers from high-level interactive components, giving you
				complete control over your application's architecture.
			</Text>
		</Container>

		<!-- Architecture Overview -->
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-xl font-semibold">Library Structure</Text>
			<Text>
				The library is organized into two distinct layers to handle different development needs:
			</Text>

			<Container class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<Container
					class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
				>
					<Text type="h3" class="mb-2 font-bold text-primary-600 dark:text-primary-400">
						Base Layer
					</Text>
					<Text class="text-sm">
						Located in <Text type="code">fluid-ui-svelte/base</Text>. These are lightweight wrappers
						around native HTML elements (Buttons, Inputs, Containers). Use them to maintain semantic
						consistency and accessibility without imposing heavy styles.
					</Text>
				</Container>

				<Container
					class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
				>
					<Text type="h3" class="mb-2 font-bold text-secondary-600 dark:text-secondary-400">
						Components Layer
					</Text>
					<Text class="text-sm">
						Located in <Text type="code">fluid-ui-svelte/components</Text>. These are fully-featured
						UI elements (Accordions, Calendars, Switches) composed from the Base Layer. They include
						interaction logic and default styling that can be themed via CSS variables.
					</Text>
				</Container>
			</Container>
		</Container>

		<!-- Installation Steps -->
		<Container class="flex flex-col gap-6">
			<Text type="h2" class="text-xl font-semibold">Installation</Text>

			<Container class="flex flex-col gap-8">
				<!-- Step 1 -->
				<Container class="flex flex-col gap-3">
					<Text type="h3" class="font-bold">1. Install the package</Text>
					<Text class="text-sm text-neutral-500"
						>Install the library using your package manager of choice.</Text
					>
					<CodeBlock code={`npm install fluid-ui-svelte`} language="bash" />
				</Container>

				<!-- Step 2 -->
				<Container class="flex flex-col gap-3">
					<Text type="h3" class="font-bold">2. Configure Global Styles</Text>
					<Text class="text-sm text-neutral-500">
						Fluid UI does not inject styles automatically. You must include the global CSS file
						which defines the theme variables and utility classes. Download the reference
						<Link href="/sample-css" target="_blank" class="font-bold underline">app.css</Link>
						and import it in your project's root layout.
					</Text>
					<CodeBlock code={codeBlockContents.gettingStartedAppCss} language="typescript" />
				</Container>
			</Container>
		</Container>

		<!-- Usage -->
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-xl font-semibold">Usage</Text>
			<Text>
				Import components directly from their respective layers. Svelte 5 Runes mode is required.
			</Text>
			<CodeBlock code={codeBlockContents.gettingStartedUsage} language="svelte" />
		</Container>
	</Container>
</Page>
