<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import Container from '$lib/base/Container.svelte';
</script>

<Page
	title="Fluid UI - Code Block"
	description="A component for displaying formatted code snippets with syntax highlighting."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">CodeBlock</Text>
			<Text>
				The CodeBlock component is designed to display code snippets in a clean, readable format,
				often with syntax highlighting. It's ideal for documentation, tutorials, or any application
				where presenting code is essential.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>The CodeBlock component accepts the following props:</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">code:</Text> A string containing the code to be displayed. This is a required
						prop.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">language:</Text> An optional string that specifies the programming language
						of the code. This is used for syntax highlighting (e.g., <Text type="code"
							>javascript</Text
						>, <Text type="code">typescript</Text>, <Text type="code">svelte</Text>, <Text
							type="code">html</Text
						>, <Text type="code">css</Text>).
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">variation:</Text> An optional string of CSS classes to apply custom styling
						variations to the code block's appearance. Applied as <Text type="code"
							>fluid-code-block-variation</Text
						>.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> An optional boolean that, when
						<Text type="code">true</Text>, prevents the component from applying its default styling.
						Defaults to <Text type="code">false</Text>.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>Here is an example of the CodeBlock component.</Text>
			<Container class="flex flex-col gap-4 rounded-lg border p-4">
				<CodeBlock
					language="svelte"
					code={`<script lang="ts">
  import CodeBlock from 'fluid-ui-svelte/components/CodeBlock.svelte';
<\/script>

<CodeBlock language="typescript" code="console.log('Hello, Fluid UI!');" />`}
				/>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import CodeBlock from 'fluid-ui-svelte/components/CodeBlock.svelte';
<\/script>

<CodeBlock language="typescript" code="console.log('Hello, Fluid UI!');" />`}
			/>
		</Container>
	</Container>
</Page>
>.
