<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<Page
	title="Text - Fluid UI"
	description="A versatile component for rendering various semantic text elements like paragraphs, headings, and inline styles."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Text</Text>
			<Text>
				The Text component is a fundamental building block for displaying text content. It uses
				Svelte's
				<Text type="code">{'<svelte:element>'}</Text> to dynamically render a wide range of semantic
				HTML text elements, from paragraphs and headings to inline styling tags.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>
				The Text component forwards all standard HTML attributes for the rendered element. It also
				includes the following custom props:
			</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">type:</Text> Specifies the HTML element to render. Defaults to
						<Text type="code">'p'</Text>. Possible values are:
					</Text>
					<Container class="mt-2 flex flex-wrap gap-2">
						{#each ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'pre', 'code', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup'] as tag}
							<Text type="code">{tag}</Text>
						{/each}
					</Container>
				</li>
				<li>
					<Text>
						<Text type="strong">class:</Text> A string of CSS classes to apply to the element for custom
						styling.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> A boolean that, when `true`, removes the
						default <Text type="code">fluid-text</Text> class. Defaults to `false`.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>Here are some examples of the Text component in action.</Text>
			<Container class="flex flex-col gap-4 rounded-lg border p-4">
				<Text type="h3" class="font-semibold">This is an H3 heading.</Text>
				<Text>
					This is a standard paragraph. You can use the Text component to add emphasis, like
					<Text type="strong">strong</Text> or <Text type="em">emphasized</Text> text. You can also
					<Text type="mark">highlight</Text>
					parts of it.
				</Text>
				<Text>
					Use it for inline code like <Text type="code">const a = 1;</Text> or for block-level code:
				</Text>
				<Text type="pre">
					<Text type="code">
						{`function greet() {
  console.log("Hello, world!");
}`}
					</Text>
				</Text>
				<Text>
					Other styles include <Text type="del">deleted</Text>, <Text type="ins">inserted</Text>,
					<Text type="sub">subscript</Text>, and <Text type="sup">superscript</Text>.
				</Text>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import Text from 'fluid-ui-svelte/base/Text.svelte';
<\/script>

<Text type="h1">Main Title</Text>
<Text>
  This is a paragraph containing some <Text type="strong">important</Text> text.
</Text>
<Text type="code">
  // This is an inline code snippet
  const message = 'Hello Svelte!';
</Text>
`}
			/>
		</Container>
	</Container>
</Page>
