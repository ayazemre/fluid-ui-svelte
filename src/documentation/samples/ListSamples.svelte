<script lang="ts">
  import { List, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  const fruitItems = ["Apple", "Banana", "Orange"];
  const numberItems = [1, 2, 3];
  const tasks = [
    { completed: true, id: 1, text: "Create documentation for List component" },
    { completed: false, id: 2, text: "Style the list items" },
    { completed: false, id: 3, text: "Push changes to repository" },
  ];
</script>

<Container id="list-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Unordered -->
  <Container id="list-sample-unordered-container" class="flex flex-col gap-2">
    <Text id="list-sample-unordered-heading" type="h3" class="text-lg font-semibold">Unordered List</Text>
    <Text id="list-sample-unordered-description" class="text-sm text-neutral-500">A basic unordered list with default markers.</Text>
    <Container id="list-sample-unordered-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <List id="list-sample-unordered-list" items={fruitItems}>
        {#snippet itemTemplate(item: string)}
          {item}
        {/snippet}
      </List>
    </Container>
    <CodeBlock id="list-sample-unordered-code" code={codeBlockContents.listUnordered} language="svelte" />
  </Container>

  <!-- Ordered -->
  <Container id="list-sample-ordered-container" class="flex flex-col gap-2">
    <Text id="list-sample-ordered-heading" type="h3" class="text-lg font-semibold">Ordered List</Text>
    <Text id="list-sample-ordered-description" class="text-sm text-neutral-500">A numbered list using the "ol" type prop.</Text>
    <Container id="list-sample-ordered-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <List id="list-sample-ordered-list" items={numberItems} type="ol">
        {#snippet itemTemplate(item: number)}
          Step {item}
        {/snippet}
      </List>
    </Container>
    <CodeBlock id="list-sample-ordered-code" code={codeBlockContents.listOrdered} language="svelte" />
  </Container>

  <!-- Item Styling -->
  <Container id="list-sample-styling-container" class="flex flex-col gap-2">
    <Text id="list-sample-styling-heading" type="h3" class="text-lg font-semibold">Item Styling</Text>
    <Text id="list-sample-styling-description" class="text-sm text-neutral-500">Styling individual items using the itemClass prop.</Text>
    <Container id="list-sample-styling-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <List id="list-sample-styling-list" items={fruitItems} itemClass="mb-2 last:mb-0 p-2 bg-neutral-100 dark:bg-neutral-800 rounded list-none">
        {#snippet itemTemplate(item)}
          {item}
        {/snippet}
      </List>
    </Container>
    <CodeBlock id="list-sample-styling-code" code={codeBlockContents.listItemStyling} language="svelte" />
  </Container>

  <!-- Complex Objects -->
  <Container id="list-sample-complex-container" class="flex flex-col gap-2">
    <Text id="list-sample-complex-heading" type="h3" class="text-lg font-semibold">Complex Objects</Text>
    <Text id="list-sample-complex-description" class="text-sm text-neutral-500">Rendering objects with custom logic in the snippet.</Text>
    <Container id="list-sample-complex-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <List id="list-sample-complex-list" items={tasks}>
        {#snippet itemTemplate(item, index)}
          <Text id={`list-sample-task-${index}`} class={item.completed ? "text-neutral-500 line-through" : ""}>
            {item.text}
          </Text>
        {/snippet}
      </List>
    </Container>
    <CodeBlock id="list-sample-complex-code" code={codeBlockContents.listComplex} language="svelte" />
  </Container>
</Container>
