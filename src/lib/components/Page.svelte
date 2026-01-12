<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	const {
		title = '',
		description = '',
		image = '',
		imageAlt = '',
		url = '',
		siteName = '',
		type = 'website',
		twitterCard = 'summary_large_image',
		themeColor = '',
		robots = 'index, follow',
		keywords = '',
		class: className = '',
		children
	}: {
		class?: string;
		title: string;
		description: string;
		image?: string;
		imageAlt?: string;
		url?: string;
		siteName?: string;
		type?: 'website' | 'article' | 'profile';
		twitterCard?: 'summary' | 'summary_large_image';
		themeColor?: string;
		robots?: string;
		keywords?: string;
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:head>
	<!-- Standard SEO -->
	{#if title}
		<title>{title}</title>
	{/if}
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
	{#if robots}
		<meta name="robots" content={robots} />
	{/if}
	{#if url}
		<link rel="canonical" href={url} />
	{/if}
	{#if themeColor}
		<meta name="theme-color" content={themeColor} />
	{/if}

	<!-- Open Graph / Facebook / Discord / LinkedIn -->
	{#if type}
		<meta property="og:type" content={type} />
	{/if}
	{#if title}
		<meta property="og:title" content={title} />
	{/if}
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	{#if siteName}
		<meta property="og:site_name" content={siteName} />
	{/if}
	{#if url}
		<meta property="og:url" content={url} />
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
		{#if imageAlt}
			<meta property="og:image:alt" content={imageAlt} />
		{/if}
	{/if}

	<!-- Twitter -->
	{#if twitterCard}
		<meta name="twitter:card" content={twitterCard} />
	{/if}
	{#if title}
		<meta name="twitter:title" content={title} />
	{/if}
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	{#if image}
		<meta name="twitter:image" content={image} />
		{#if imageAlt}
			<meta name="twitter:image:alt" content={imageAlt} />
		{/if}
	{/if}
</svelte:head>

<Container class={mergeClasses(className, 'fluid-page flex w-full flex-1 flex-col')} type="main">
	{@render children?.()}
</Container>
