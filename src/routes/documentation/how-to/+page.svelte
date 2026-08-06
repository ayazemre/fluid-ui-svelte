<script lang="ts">
	import { Page } from '$lib/components';
	import { Text, Container, Link } from '$lib/base';
</script>

<Page
	class="documentation-page"
	title="Fluid UI - How To"
	description="Recipes for theming, composition and custom implementations with Fluid UI."
>
	<Container class="documentation-stack">
		<Container class="documentation-block">
			<Text class="documentation-label">Guides</Text>
			<Text type="h1" class="documentation-page-title">How to</Text>
			<Text class="documentation-lede">
				Recipes for theming, composition and custom implementations.
			</Text>
		</Container>

		<Container class="documentation-notice">
			<Text type="h2" class="documentation-subtitle">No recipes published yet</Text>
			<Text class="documentation-body">
				Until these land, the component pages carry a working example for every prop, and
				<Link href="/documentation/getting-started">Getting started</Link> covers installation and theming
				through the stylesheet.
			</Text>
		</Container>
	</Container>
</Page>
