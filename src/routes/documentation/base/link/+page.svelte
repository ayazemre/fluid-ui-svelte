<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Link from '$lib/base/Link.svelte';
</script>

<Page
	title="Link - Fluid UI"
	description="A component for client-side navigation within a SvelteKit application."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Link</Text>
			<Text>
				The Link component is a wrapper around the standard HTML <Text type="code">{'<a>'}</Text> tag,
				specifically designed for SvelteKit applications. It intercepts click events to provide smooth,
				client-side navigation using SvelteKit's <Text type="code">goto</Text> function, preventing full
				page reloads.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>
				The Link component forwards all standard <Text type="code">{'<a>'}</Text> attributes (like
				<Text type="code">href</Text>, <Text type="code">target</Text>, etc.). It also includes the
				following custom props:
			</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">class:</Text> A string of CSS classes to apply to the link for custom
						styling.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> A boolean that, when `true`, removes the
						default <Text type="code">fluid-link</Text> class. Defaults to `false`.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>Here are some examples of how you can use the Link component.</Text>
			<Container class="flex flex-wrap items-center gap-4 rounded-lg border p-4">
				<Link href="/documentation/base/button">Go to Button Docs</Link>
				<Link href="/documentation/base/container" class="text-primary-600 dark:text-primary-400">
					Go to Container Docs
				</Link>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import Link from 'fluid-ui-svelte/base/Link.svelte';
<\/script>

<!-- A standard link -->
<Link href="/about">
  About Us
</Link>

<!-- A link with custom styling -->
<Link href="/contact" class="font-bold text-secondary-600 dark:text-secondary-400">
  Contact
</Link>`}
			/>
		</Container>
	</Container>
</Page>
