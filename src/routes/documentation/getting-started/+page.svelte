<script lang="ts">
	import { CodeBlock, Page } from '$lib/components/index.js';
	import { Text, Link, Container, List } from '$lib/base/index.js';
</script>

<Page
	title="Getting Started - Fluid UI"
	description="Getting started with Fluid UI, a modern Svelte component library."
>
	<Container class="flex flex-col gap-4">
		<Text type="h1" class="text-4xl font-bold">Getting Started</Text>

		<Text>
			Welcome to Fluid UI! This library was born from the desire to create a consistent, beautiful,
			and developer-friendly set of components for modern web applications. We believe in building
			on top of web standards and providing a solid foundation that is both flexible and easy to
			use.
		</Text>

		<Text type="h3" class="text-xl font-semibold">Our Philosophy: Two Layers</Text>
		<Text
			>Fluid UI is structured into two main layers: <Text type="code">Base</Text> and <Text
				type="code">Components</Text
			>.</Text
		>
		<List
			items={[
				{
					label: 'Base Components:',
					content:
						'These are minimal wrappers around native HTML elements (like buttons, inputs, etc.). Their primary purpose is to ensure consistent semantics and accessibility across different platforms, especially in cross-platform applications (e.g., using Tauri or Electron). You are not required to use them, but they provide a solid, standardized starting point.'
				},
				{
					label: 'Components:',
					content:
						"These are more complex, feature-rich components like Accordions, Calendars, and Switches, built upon the Base layer or from scratch to provide advanced functionality. Many of these components accept a variant prop that allows you to switch between different styles (e.g., 'primary', 'secondary'). To create new variants, you'll need to add the corresponding styles to your app.css file."
				}
			]}
			class="flex list-disc flex-col gap-2 pl-6"
		>
			{#snippet itemTemplate(item)}
				<Text>
					<Text type="strong">{item.label}</Text>
					{item.content}
				</Text>
			{/snippet}
		</List>

		<Text type="h3" class="text-xl font-semibold">Styling</Text>
		<Text>
			Styling in Fluid UI revolves around a central <Text type="code">app.css</Text> file where a theme
			structure is defined using CSS variables. This approach allows for easy and extensive customization.
			You can override the default styles globally or on a per-component basis to match your application's
			design system. Some of the text content and examples you'll see in this documentation are generated
			by Large Language Models (LLMs) to provide illustrative examples.
		</Text>

		<Text type="h2" class="text-2xl font-semibold">Installation</Text>
		<Text>To get started with Fluid UI, you need to install it from npm:</Text>
		<CodeBlock code={`npm install fluid-ui-svelte`} language="bash" />

		<Text>
			Fluid UI does not provide a default <Text type="code">app.css</Text> file out of the box. Instead,
			you should download the sample <Link
				href="https://github.com/ayazemre/fluid-ui-svelte/blob/main/src/app.css"
				target="_blank">app.css</Link
			> from the repository, place it in your project (e.g., <Text type="code">src/app.css</Text>),
			and customize it to your needs.
		</Text>
		<Text>
			Once you have your <Text type="code">app.css</Text>, import it into your root layout file
			(e.g.,
			<Text type="code">src/routes/+layout.svelte</Text>):
		</Text>
		<CodeBlock code={`import '../app.css';`} language="typescript" />

		<Text type="h2" class="text-2xl font-semibold">Usage</Text>
		<Text>You can now import and use components from either the base or components layer.</Text>
		<CodeBlock
			code={`// Import from the base layer
import { Button } from 'fluid-ui-svelte/base';

// Import from the components layer
import { Accordion } from 'fluid-ui-svelte/components';`}
			language="typescript"
		/>
	</Container>
</Page>
