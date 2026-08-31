<script lang="ts">
  import { Text, Container } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="text-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Headings -->
  <Container id="text-sample-headings-container" class="flex flex-col gap-2">
    <Text id="text-sample-headings-heading" type="h3" class="text-lg font-semibold">Semantic Headings</Text>
    <Text id="text-sample-headings-description" class="text-sm text-neutral-500">Render various heading levels using the type prop.</Text>
    <Container id="text-sample-headings-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Text id="text-sample-h1" type="h1" class="text-2xl font-bold">Heading 1</Text>
      <Text id="text-sample-h2" type="h2" class="text-xl font-semibold">Heading 2</Text>
      <Text id="text-sample-h3" type="h3" class="text-lg font-medium">Heading 3</Text>
    </Container>
    <CodeBlock id="text-sample-headings-code" code={codeBlockContents.textHeadings} language="svelte" />
  </Container>

  <!-- Inline Styles -->
  <Container id="text-sample-inline-container" class="flex flex-col gap-2">
    <Text id="text-sample-inline-heading" type="h3" class="text-lg font-semibold">Inline Emphasis</Text>
    <Text id="text-sample-inline-description" class="text-sm text-neutral-500">Use semantic tags for bold, italic, or highlighted text.</Text>
    <Container id="text-sample-inline-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Text id="text-sample-inline-text">
        This is <Text id="text-sample-inline-strong" type="strong">bold</Text>, <Text id="text-sample-inline-em" type="em">italic</Text>, and
        <Text id="text-sample-inline-mark" type="mark">highlighted</Text>.
      </Text>
    </Container>
    <CodeBlock id="text-sample-inline-code" code={codeBlockContents.textInline} language="svelte" />
  </Container>

  <!-- Code and Pre -->
  <Container id="text-sample-code-container" class="flex flex-col gap-2">
    <Text id="text-sample-code-heading" type="h3" class="text-lg font-semibold">Code & Preformatted</Text>
    <Text id="text-sample-code-description" class="text-sm text-neutral-500">Perfect for technical documentation or data display.</Text>
    <Container id="text-sample-code-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Text id="text-sample-code-inline" type="code">const fluid = 'awesome';</Text>
      <Text id="text-sample-pre-block" type="pre" class="mt-2 text-xs">
        {`{
"library": "fluid-ui",
"framework": "svelte"
}`}
      </Text>
    </Container>
    <CodeBlock id="text-sample-code-code" code={codeBlockContents.textCode} language="svelte" />
  </Container>

  <!-- Semantic Extras -->
  <Container id="text-sample-semantic-container" class="flex flex-col gap-2">
    <Text id="text-sample-semantic-heading" type="h3" class="text-lg font-semibold">Semantic Markers</Text>
    <Text id="text-sample-semantic-description" class="text-sm text-neutral-500">Support for deleted, inserted, sub and superscript.</Text>
    <Container id="text-sample-semantic-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Text id="text-sample-semantic-prices">
        <Text id="text-sample-del-price" type="del">Old price</Text>
        <Text id="text-sample-ins-price" type="ins">New price</Text>
      </Text>
      <Text id="text-sample-semantic-formulas" class="mt-2">
        H<Text id="text-sample-sub-formula" type="sub">2</Text>O and E = mc<Text id="text-sample-sup-formula" type="sup">2</Text>
      </Text>
    </Container>
    <CodeBlock id="text-sample-semantic-code" code={codeBlockContents.textSemantic} language="svelte" />
  </Container>
</Container>
