<script lang="ts">
	import { codeBlockContents } from '../../../documentation/samples/codeBlockContents.js';
	import { CodeBlock, Page } from '$lib/components';
	import { Text, Link, Container } from '$lib/base';
</script>

<Page
	class="documentation-page"
	title="Fluid UI - Getting Started"
	description="Install Fluid UI, add the stylesheet to your project, and import your first component."
>
	<Container class="documentation-stack">
		<Container class="documentation-block">
			<Text class="documentation-label">Guides</Text>
			<Text type="h1" class="documentation-page-title">Getting started</Text>
			<Text class="documentation-lede">
				Fluid UI needs Svelte 5 in runes mode. Installing takes two steps: add the package, then put
				the stylesheet in your project.
			</Text>
		</Container>

		<Container class="documentation-block">
			<Text type="h2" class="documentation-subtitle">Install the package</Text>
			<CodeBlock code="npm install fluid-ui-svelte" language="bash" showLineNumbers={false} />
		</Container>

		<Container class="documentation-block">
			<Text type="h2" class="documentation-subtitle">Add the stylesheet</Text>
			<Text class="documentation-body">
				Fluid UI never injects styles at runtime, so the stylesheet lives with your code rather than
				inside the package. Download
				<Link href="/fluidui.css" target="_blank">fluidui.css</Link>, drop it next to your app
				styles — <Text type="code" class="documentation-inline-code">src/</Text> is a good home — and
				import it from your main CSS file. From that point on the file is yours: change a value and every
				component follows.
			</Text>
			<CodeBlock code={codeBlockContents.gettingStartedAppCss} language="css" />
		</Container>

		<Container class="documentation-block">
			<Text type="h2" class="documentation-subtitle">Import a component</Text>
			<Text class="documentation-body">
				Each layer has its own entry point. Import wrappers from
				<Text type="code" class="documentation-inline-code">fluid-ui-svelte/base</Text> and interactive
				elements from
				<Text type="code" class="documentation-inline-code">fluid-ui-svelte/components</Text>.
			</Text>
			<CodeBlock code={codeBlockContents.gettingStartedUsage} language="svelte" />
		</Container>

		<Container class="documentation-next">
			<Text class="documentation-label">Next</Text>
			<Link href="/documentation/base/button" class="documentation-next-link"
				>Browse every component →</Link
			>
			<Text class="documentation-body">Props, live previews and copyable code for each one.</Text>
		</Container>
	</Container>
</Page>
