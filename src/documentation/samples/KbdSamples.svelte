<script lang="ts">
	import { Container, Kbd, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-6">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Keyboard Shortcut Badges</Text>
		<Container class="flex flex-wrap items-center gap-3">
			<Container class="flex items-center gap-1.5 text-sm text-content">
				<Text type="span">Save:</Text>
				<Kbd>Ctrl</Kbd>
				<Text type="span">+</Text>
				<Kbd>S</Kbd>
			</Container>
			<Container class="flex items-center gap-1.5 text-sm text-content">
				<Text type="span">Command Palette:</Text>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</Container>
			<Container class="flex items-center gap-1.5 text-sm text-content">
				<Text type="span">Cancel:</Text>
				<Kbd>Esc</Kbd>
			</Container>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.kbdBasic} language="svelte" />
		</Container>
	</Container>
</Container>
