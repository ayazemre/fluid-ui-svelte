<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Icon from '@iconify/svelte';
	import Button from '../lib/base/Button.svelte';
	import Text from '../lib/base/Text.svelte';
	import { goto } from '$app/navigation';
</script>

<Container class="absolute inset-0 -z-10">
	<Container
		class="absolute top-[10%] right-[15%] h-[500px] w-[500px] animate-pulse rounded-full bg-linear-to-br from-[#5067EB]/20 via-[#5067EB]/10 to-transparent blur-3xl [animation-duration:8s]"
	></Container>
	<Container
		class="absolute bottom-[5%] left-[10%] h-[600px] w-[600px] animate-pulse rounded-full bg-linear-to-tr from-[#4ECDC4]/20 via-[#4ECDC4]/10 to-transparent blur-3xl [animation-delay:2s] [animation-duration:10s]"
	></Container>
	<Container
		class="absolute top-[45%] left-[40%] h-[350px] w-[350px] animate-pulse rounded-full bg-linear-to-bl from-[#5067EB]/15 via-[#4ECDC4]/10 to-transparent blur-3xl [animation-delay:4s] [animation-duration:12s]"
	></Container>

	<Container
		class="absolute top-[20%] left-[25%] h-32 w-32 animate-bounce rounded-full bg-linear-to-br from-[#5067EB] to-[#5067EB]/50 opacity-[0.08] [animation-duration:6s]"
	></Container>
	<Container
		class="absolute right-[30%] bottom-[25%] h-40 w-40 animate-bounce rounded-full bg-linear-to-tl from-[#4ECDC4] to-[#4ECDC4]/50 opacity-[0.08] [animation-delay:1s] [animation-duration:7s]"
	></Container>
	<Container
		class="absolute top-[60%] left-[15%] h-24 w-24 animate-bounce rounded-full bg-linear-to-br from-[#110F36] to-[#110F36]/50 opacity-[0.05] [animation-delay:2s] [animation-duration:8s]"
	></Container>

	<Container
		class="absolute top-[30%] right-[25%] h-3 w-3 animate-ping rounded-full bg-[#5067EB] opacity-30 [animation-duration:3s]"
	></Container>
	<Container
		class="absolute top-[50%] right-[20%] h-2 w-2 animate-ping rounded-full bg-[#4ECDC4] opacity-40 [animation-delay:1s] [animation-duration:4s]"
	></Container>
	<Container
		class="absolute bottom-[40%] left-[30%] h-3 w-3 animate-ping rounded-full bg-[#5067EB] opacity-25 [animation-delay:2s] [animation-duration:5s]"
	></Container>
	<Container
		class="absolute top-[70%] right-[40%] h-2 w-2 animate-ping rounded-full bg-[#110F36] opacity-20 [animation-delay:1.5s] [animation-duration:4.5s]"
	></Container>
	<Container
		class="absolute top-[35%] left-[45%] h-2 w-2 animate-ping rounded-full bg-[#4ECDC4] opacity-35 [animation-delay:0.5s] [animation-duration:3.5s]"
	></Container>

	<Container
		class="absolute top-[25%] right-[35%] h-20 w-20 animate-spin rounded-full border-2 border-[#5067EB] opacity-[0.12] [animation-duration:20s]"
	></Container>
	<Container
		class="absolute bottom-[35%] left-[25%] h-28 w-28 animate-spin rounded-full border-2 border-[#4ECDC4] opacity-[0.12] [animation-direction:reverse] [animation-duration:25s]"
	></Container>
</Container>

<Container class="dark z-10 flex flex-1 flex-col items-center justify-center gap-4 p-16">
	<Container class="flex text-center">
		<Text type="h1" class="text-6xl font-bold"
			>Build with <Text
				type="span"
				class="bg-linear-to-r from-primary-600 to-secondary-300 bg-clip-text text-transparent"
				>Fluid UI</Text
			></Text
		>
	</Container>
	<Container class="flex">
		<Text class="text-xl"
			>A modern Svelte component library for building beautiful, responsive interfaces.</Text
		>
	</Container>
	<Container class="flex gap-2">
		<Button
			onclick={async () => {
				await goto('/documentation/introduction');
			}}
			class="fluid-button-primary px-8! py-3! font-semibold"
		>
			<Text>Get Started</Text>
		</Button>
		<Button
			onclick={async () => {
				window.open('https://github.com/ayazemre/fluid-ui-svelte', '_blank');
			}}
			class="fluid-button-outline flex items-center gap-1 px-8! py-3! font-semibold"
		>
			<Icon icon="akar-icons:github-fill"></Icon>
			<Text>GitHub</Text>
		</Button>
	</Container>
	<Text class="absolute bottom-4 text-sm text-neutral-400"
		>{'© Fluid UI ' + new Date().getFullYear()}</Text
	>
</Container>
