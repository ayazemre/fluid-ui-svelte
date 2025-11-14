<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<Page
	title="Container - Fluid UI"
	description="The Container component is a versatile wrapper for layout and styling, rendering as different HTML5 semantic elements."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Container</Text>
			<Text>
				The Container component is a fundamental building block for creating layouts. It acts as a
				versatile wrapper that can render as various HTML5 semantic elements like <Text type="code"
					>div</Text
				>, <Text type="code">section</Text>, <Text type="code">nav</Text>, and more, helping you
				structure your application with semantic meaning.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>
				The Container component forwards all standard HTML attributes. It also includes the
				following custom props:
			</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">type:</Text> Specifies the HTML element to render. It can be one of
						<Text type="code">'div'</Text>, <Text type="code">'nav'</Text>,
						<Text type="code">'section'</Text>, <Text type="code">'main'</Text>,
						<Text type="code">'header'</Text>, <Text type="code">'footer'</Text>,
						<Text type="code">'aside'</Text>, or <Text type="code">'article'</Text>. Defaults to
						<Text type="code">'div'</Text>.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">class:</Text> A string of CSS classes to apply to the container for custom
						styling.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> A boolean that, when `true`, removes the
						default <Text type="code">fluid-container</Text> class, giving you full control over styling.
						Defaults to `false`.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">transitionFn:</Text> A Svelte transition function to apply to the container.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">transitionParams:</Text> An object of parameters to pass to the
						<Text type="code">transitionFn</Text>.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>
				Here are some examples of how you can use the Container component with different semantic
				elements.
			</Text>
			<Container class="flex flex-col gap-4 rounded-lg border p-4">
				<Container
					type="header"
					overrideDefaultStyling
					class="rounded bg-primary-100 p-4 dark:bg-primary-900"
				>
					<Text type="h3">Header Container</Text>
				</Container>
				<Container
					type="nav"
					overrideDefaultStyling
					class="rounded bg-secondary-100 p-4 dark:bg-secondary-900"
				>
					<Text>Navigation Container</Text>
				</Container>
				<Container
					type="section"
					overrideDefaultStyling
					class="rounded bg-info-100 p-4 dark:bg-info-900"
				>
					<Text>Section Container</Text>
				</Container>
				<Container
					type="article"
					overrideDefaultStyling
					class="rounded bg-success-100 p-4 dark:bg-success-900"
				>
					<Text>Article Container</Text>
				</Container>
				<Container
					type="footer"
					overrideDefaultStyling
					class="rounded bg-warning-100 p-4 dark:bg-warning-900"
				>
					<Text>Footer Container</Text>
				</Container>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import Container from 'fluid-ui-svelte/base/Container.svelte';
  import Text from 'fluid-ui-svelte/base/Text.svelte';
<\/script>

<Container type="section" class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
  <Text type="h3">This is a section</Text>
  <Text>You can place any content inside a container.</Text>
</Container>`}
			/>
		</Container>
	</Container>
</Page>
