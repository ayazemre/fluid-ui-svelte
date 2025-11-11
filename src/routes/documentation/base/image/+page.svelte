<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Image from '$lib/base/Image.svelte';
</script>

<Page
	title="Image - Fluid UI"
	description="The Image component is a wrapper for the native HTML <img> tag, with built-in styling for loading states."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Image</Text>
			<Text>
				The Image component is a simple wrapper around the standard HTML <Text type="code"
					>{'<img>'}</Text
				>
				tag. It automatically applies a <Text type="code">fluid-image-loading</Text> class while the
				image is loading, which allows for easy implementation of loading states like skeletons or shimmer
				effects.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>
				The Image component forwards all standard <Text type="code">{'<img>'}</Text> attributes (like
				<Text type="code">src</Text>, <Text type="code">alt</Text>, etc.). It also includes the
				following custom props:
			</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">class:</Text> A string of CSS classes to apply to the image for custom
						styling.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> A boolean that, when `true`, removes the
						default <Text type="code">fluid-image</Text> class. Defaults to `false`.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>
				Here is a basic example of the Image component. While it's loading, it will have the
				<Text type="code">fluid-image-loading</Text> class, which you can target with CSS to create loading
				effects.
			</Text>
			<Container class="flex flex-col items-center gap-4 rounded-lg border p-4">
				<Image
					src="https://picsum.photos/500/300"
					alt="A beautiful landscape"
					class="w-full rounded-lg object-cover"
				/>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import Image from 'fluid-ui-svelte/base/Image.svelte';
<\/script>

<!-- The fluid-image-loading class is automatically applied
     while the image loads. You can style this class in your global CSS. -->
<Image
  src="https://picsum.photos/600/900"
  alt="A beautiful landscape"
  class="h-64 w-full rounded-lg object-cover"
/>`}
			/>
		</Container>
	</Container>
</Page>
