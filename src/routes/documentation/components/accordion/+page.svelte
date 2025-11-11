<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import Container from '$lib/base/Container.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
</script>

<Page
	title="Accordion - Fluid UI"
	description="A vertically stacked set of interactive headings that each reveal a section of content."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Accordion</Text>
			<Text>
				The Accordion component allows you to create collapsible sections of content. It's useful
				for FAQs, navigation menus, or any situation where you need to toggle the visibility of
				content to save space.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>The Accordion component accepts the following props:</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">variation:</Text> An optional string of CSS classes to apply custom styling
						variations to the accordion's trigger, header, and body.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">header:</Text> A required Svelte snippet for the accordion's header.
						It receives an <Text type="code">options</Text> object with an
						<Text type="code">isExpanded: boolean</Text> property that you can use to change the header's
						appearance based on the accordion's state.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">body:</Text> A required Svelte snippet for the accordion's content, which
						is displayed when the accordion is expanded.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">transitionFunction:</Text> An optional Svelte transition function for
						the body's reveal animation. Defaults to <Text type="code">slide</Text> from 'svelte/transition'.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">transitionDuration:</Text> An optional number that specifies the duration
						of the transition in milliseconds. Defaults to <Text type="code">250</Text>.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>Here is an example of the Accordion component.</Text>
			<Container class="flex flex-col gap-4 rounded-lg border p-4">
				<Accordion>
					{#snippet header(options)}
						<Text>Accordion Header</Text>
						<Icon icon={options.isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
					{/snippet}
					{#snippet body()}
						<Text>
							This is the content of the accordion. It can contain any Svelte components or HTML.
						</Text>
					{/snippet}
				</Accordion>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import Accordion from 'fluid-ui-svelte/components/Accordion.svelte';
  import Text from 'fluid-ui-svelte/base/Text.svelte';
  import Icon from '@iconify/svelte';
<\/script>

<Accordion>
  {#snippet header({ isExpanded })}
    <Text>Is it expanded? {isExpanded ? 'Yes' : 'No'}</Text>
    <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
  {/snippet}
  {#snippet body()}
    <Text class="p-4 border-t">
      Here is some content that was previously hidden.
    </Text>
  {/snippet}
</Accordion>`}
			/>
		</Container>
	</Container>
</Page>
