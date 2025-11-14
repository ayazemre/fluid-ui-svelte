<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import InputField from '$lib/base/InputField.svelte';

	let textValue = 'Some text';
	let passwordValue = 'password123';
	let numericValue = '';
	let errorValue = 'invalid-email@';
</script>

<Page
	title="Input Field - Fluid UI"
	description="A form input field component with support for character filtering and custom styling."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Input Field</Text>
			<Text>
				The Input Field component is an enhanced wrapper for the native HTML <Text type="code"
					>{'<input>'}</Text
				>
				element. It provides built-in functionality for real-time character filtering, making it easy
				to create inputs that only accept specific characters, such as numbers.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>
				The Input Field component forwards all standard <Text type="code">{'<input>'}</Text> attributes
				(like <Text type="code">placeholder</Text>, <Text type="code">disabled</Text>, etc.). It
				also includes the following custom props:
			</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text
						><Text type="strong">value:</Text> A bindable string that holds the input's value.</Text
					>
				</li>
				<li>
					<Text>
						<Text type="strong">type:</Text> The type of the input. Can be <Text type="code"
							>'text'</Text
						> or <Text type="code">'password'</Text>. Defaults to <Text type="code">'text'</Text>.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">class:</Text> A string of CSS classes to apply to the input for custom
						styling.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text> A boolean that, when `true`, removes the
						default <Text type="code">fluid-input-field</Text> class. Defaults to `false`.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">characterFilter:</Text> An array of strings representing allowed characters.
						Any character typed that is not in this array will be automatically removed. For example,
						to allow only numbers, you can pass <Text type="code"
							>{`['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']`}</Text
						>.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>Here are some examples of the Input Field component in action.</Text>
			<Container class="flex flex-col gap-4 rounded-lg border p-4">
				<Container class="flex flex-col gap-2">
					<Text type="strong">Text Input</Text>
					<InputField placeholder="Enter your name" bind:value={textValue} />
				</Container>
				<Container class="flex flex-col gap-2">
					<Text type="strong">Password Input</Text>
					<InputField
						type="password"
						placeholder="Enter your password"
						bind:value={passwordValue}
					/>
				</Container>
				<Container class="flex flex-col gap-2">
					<Text type="strong">Numeric Input (with characterFilter)</Text>
					<InputField
						placeholder="Enter numbers only"
						bind:value={numericValue}
						characterFilter={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
					/>
				</Container>
				<Container class="flex flex-col gap-2">
					<Text type="strong">Error State</Text>
					<InputField
						class="fluid-input-field-error"
						placeholder="Enter your email"
						bind:value={errorValue}
					/>
				</Container>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import InputField from 'fluid-ui-svelte/base/InputField.svelte';

  let numericValue = '';
  const numericFilter = Array.from({ length: 10 }, (_, i) => i.toString());
<\/script>

<InputField
  placeholder="Enter your age"
  bind:value={numericValue}
  characterFilter={numericFilter}
/>`}
			/>
		</Container>
	</Container>
</Page>
