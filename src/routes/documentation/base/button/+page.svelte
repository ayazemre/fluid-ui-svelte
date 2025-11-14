<script lang="ts">
	import Button from '$lib/base/Button.svelte';
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Icon from '@iconify/svelte';
</script>

<Page
	title="Button - Fluid UI"
	description="The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, or performing a data-related action."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Button</Text>
			<Text>
				The Button component is used to trigger an action or event, such as submitting a form,
				opening a dialog, or performing a data-related action. It's a fundamental interactive
				element.
			</Text>
		</Container>
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>
				The Button component forwards all standard HTML button attributes (like <Text type="code"
					>type</Text
				>,
				<Text type="code">disabled</Text>, etc.), except for `onclick`. It also includes the
				following custom props:
			</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">onclick:</Text> This is a custom prop that only accepts an
						<Text type="code">async</Text> function with two arguments: <Text type="code"
							>event</Text
						> and <Text type="code">buttonState</Text>. The <Text type="code">buttonState</Text>
						object has an <Text type="code">inProgress: boolean</Text> property. This property is `true`
						while the async function is executing, allowing you to show a loading state.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">class:</Text> A string of CSS classes to apply to the button for custom
						styling.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> A boolean that, when `true`, removes the
						default <Text type="code">fluid-button</Text> class, giving you full control over styling.
						Defaults to `false`.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">loadingPlaceholder:</Text> A Svelte snippet that is rendered inside the
						button when the <Text type="code">onclick</Text> function is in progress. This is useful
						for showing a loading indicator.
					</Text>
				</li>
			</ul>
		</Container>
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>
				Buttons come with predefined variants that you can apply using CSS classes. You can also
				create your own variants in your <Text type="code">app.css</Text> file.
			</Text>
			<Container class="flex flex-wrap items-center gap-4">
				<Button
					class="fluid-button-primary flex items-center justify-center gap-2"
					onclick={async (event, buttonState) => {
						buttonState.inProgress = true;
						try {
							await new Promise((resolve) => setTimeout(resolve, 1000));
						} finally {
							buttonState.inProgress = false;
						}
					}}
				>
					{#snippet loadingPlaceholder()}
						<Icon icon="line-md:loading-twotone-loop" />
						<span>Loading...</span>
					{/snippet}
					Primary
				</Button>
				<Button
					class="fluid-button-secondary flex items-center justify-center gap-2"
					onclick={async (event, buttonState) => {
						buttonState.inProgress = true;
						try {
							await new Promise((resolve) => setTimeout(resolve, 1000));
						} finally {
							buttonState.inProgress = false;
						}
					}}
				>
					{#snippet loadingPlaceholder()}
						<Icon icon="line-md:loading-twotone-loop" />
						<span>Loading...</span>
					{/snippet}
					Secondary
				</Button>
				<Button
					class="fluid-button-outline flex items-center justify-center gap-2"
					onclick={async (event, buttonState) => {
						buttonState.inProgress = true;
						try {
							await new Promise((resolve) => setTimeout(resolve, 1000));
						} finally {
							buttonState.inProgress = false;
						}
					}}
				>
					{#snippet loadingPlaceholder()}
						<Icon icon="line-md:loading-twotone-loop" />
						<span>Loading...</span>
					{/snippet}
					Outline
				</Button>
				<Button
					class="fluid-button-primary flex items-center justify-center gap-2"
					onclick={async (event, buttonState) => {
						buttonState.inProgress = true;
						try {
							await new Promise((resolve) => setTimeout(resolve, 1000));
						} finally {
							buttonState.inProgress = false;
						}
					}}
				>
					{#snippet loadingPlaceholder()}
						<Icon icon="line-md:loading-twotone-loop" />
						<span>Loading...</span>
					{/snippet}
					<Icon icon="mdi:github" /><span>GitHub</span>
				</Button>
			</Container>
			<CodeBlock
				code={`<Button class="fluid-button-primary">Primary</Button>
<Button class="fluid-button-secondary">Secondary</Button>
<Button class="fluid-button-outline">Outline</Button>`}
				language="svelte"
			/>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<Container class="flex items-center gap-4"></Container>
			<CodeBlock
				code={`<script lang="ts">
  import Button from 'fluid-ui-svelte/base/Button.svelte';
<\/script>

<!-- With loading placeholder -->
<Button
  type="button"
  disabled={false}
  aria-label="Click this button"
  class="fluid-button-primary"
  onclick={async (event, buttonState) => {
    buttonState.inProgress = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Clicked!');
    } finally {
      buttonState.inProgress = false;
    }
  }}
>
{#snippet loadingPlaceholder()}
<Icon icon="line-md:loading-twotone-loop" />
Loading...
{/snippet}
Click Me
</Button>`}
				language="svelte"
			/>
		</Container>
	</Container>
</Page>
