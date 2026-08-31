<script lang="ts">
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";

  import { Container, Text } from "#src/lib/base/index.ts";
  import { Accordion, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="accordion-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Standard Accordion -->
  <Container id="accordion-sample-standard-container" class="flex flex-col gap-2">
    <Text id="accordion-sample-standard-heading" type="h3" class="text-lg font-semibold">Standard Accordion</Text>
    <Text id="accordion-sample-standard-description" class="text-sm text-neutral-500">The default look with chevron indicators.</Text>
    <Container id="accordion-sample-standard-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Accordion id="accordion-sample-standard">
        {#snippet header({ isExpanded })}
          <Container id="accordion-sample-standard-header-content" class="flex w-full items-center justify-between p-2">
            <Text id="accordion-sample-standard-header-title">General Information</Text>
            <Icon icon={isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} />
          </Container>
        {/snippet}
        {#snippet body()}
          <Container id="accordion-sample-standard-body-content" class="p-4 text-sm text-neutral-600 dark:text-neutral-400">
            Accordions are perfect for grouping content while keeping the interface clean and scannable.
          </Container>
        {/snippet}
      </Accordion>
    </Container>
    <CodeBlock id="accordion-sample-standard-code" code={codeBlockContents.accordionStandard} language="svelte" />
  </Container>

  <!-- Custom Transition -->
  <Container id="accordion-sample-custom-container" class="flex flex-col gap-2">
    <Text id="accordion-sample-custom-heading" type="h3" class="text-lg font-semibold">Custom Transition</Text>
    <Text id="accordion-sample-custom-description" class="text-sm text-neutral-500">Using different Svelte transitions and durations.</Text>
    <Container id="accordion-sample-custom-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Accordion id="accordion-sample-custom" transitionFunction={fade} transitionDuration={500}>
        {#snippet header({ isExpanded })}
          <Container id="accordion-sample-custom-header-content" class="flex w-full items-center gap-2 p-2">
            <Text id="accordion-sample-custom-header-title" class={isExpanded ? "font-bold text-primary-500" : ""}>Fade Animation</Text>
          </Container>
        {/snippet}
        {#snippet body()}
          <Container id="accordion-sample-custom-body-content" class="p-4 italic">This accordion uses a cross-fade transition instead of the default slide.</Container>
        {/snippet}
      </Accordion>
    </Container>
    <CodeBlock id="accordion-sample-custom-code" code={codeBlockContents.accordionCustom} language="svelte" />
  </Container>
</Container>
