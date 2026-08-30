<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";
  import { serializeStructuredData, type OpenGraphType, type TwitterCardType } from "#src/lib/utilities/page.ts";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    componentId,
    title = "",
    description = "",
    image = "",
    imageAlt = "",
    url = "",
    siteName = "",
    type = "website",
    twitterCard = "summary_large_image",
    twitterSite = "",
    twitterCreator = "",
    locale = "",
    themeColor = "",
    robots = "index, follow",
    keywords = "",
    author = "",
    structuredData,
    class: className = "",
    children,
    ...rest
  }: {
    componentId: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    url?: string;
    siteName?: string;
    type?: OpenGraphType;
    twitterCard?: TwitterCardType;
    twitterSite?: string;
    twitterCreator?: string;
    locale?: string;
    themeColor?: string;
    robots?: string;
    keywords?: string;
    author?: string;
    structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
    class?: string;
    children?: Snippet;
  } & HTMLAttributes<HTMLElement> = $props();

  const serializedLdJson = $derived(structuredData ? serializeStructuredData(structuredData) : "");
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
  {#if author}
    <meta name="author" content={author} />
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

  <!-- Open Graph / Social -->
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
  {#if locale}
    <meta property="og:locale" content={locale} />
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
  {#if twitterSite}
    <meta name="twitter:site" content={twitterSite} />
  {/if}
  {#if twitterCreator}
    <meta name="twitter:creator" content={twitterCreator} />
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

  <!-- Structured Data JSON-LD -->
  {#if serializedLdJson}
    {@html '<script type="application/ld+json">' + serializedLdJson + "</" + "script>"}
  {/if}
</svelte:head>

<Container id={componentId} type="main" class={[className, "fluid-page flex w-full flex-1 flex-col"].join(" ")} {...rest}>
  {@render children?.()}
</Container>
