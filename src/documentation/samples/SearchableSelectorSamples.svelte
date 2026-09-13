<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";
  import { SearchableSelector } from "#src/lib/prebuilt/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  const sampleItems = [
    { avatarText: "EA", label: "Emre Ayaz", value: "emre" },
    { avatarText: "AJ", label: "Alice Johnson", value: "alice" },
    { avatarText: "BS", label: "Bob Smith", value: "bob" },
    { avatarText: "CB", label: "Charlie Brown", value: "charlie" },
    { avatarText: "DP", label: "Diana Prince", value: "diana" },
    { avatarText: "EH", label: "Ethan Hunt", value: "ethan" }
  ];

  const imageItems = [
    { avatarImage: "https://picsum.photos/id/1011/100/100", label: "Emre Ayaz", value: "emre" },
    { avatarImage: "https://picsum.photos/id/1027/100/100", label: "Sarah Connor", value: "sarah" },
    { avatarImage: "https://picsum.photos/id/1005/100/100", label: "John Doe", value: "john" }
  ];

  let selectedUser = $state<string | undefined>("emre");
  let selectedWithImages = $state<string | undefined>(undefined);
</script>

<Container id="searchable-selector-samples-container" class="flex flex-col gap-8">
  <!-- 1. Basic with Avatar Text -->
  <Container id="searchable-selector-basic-section" class="flex flex-col gap-2">
    <Text id="searchable-selector-basic-heading" type="h3" class="text-xl font-bold">1. Basic Searchable Selector</Text>
    <Text id="searchable-selector-basic-description" class="text-neutral-500">
      Dropdown with search, circle avatar (initials), name, and double arrow on trigger. Filters by label and value.
    </Text>
    <Container id="searchable-selector-basic-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="searchable-selector-basic-wrapper" class="max-w-sm">
        <SearchableSelector
          id="searchable-selector-basic-demo"
          items={sampleItems}
          bind:selectedValue={selectedUser}
          placeholder="Select a user"
          searchPlaceholder="Search users..."
        />
        <Text id="searchable-selector-basic-status" class="mt-3 text-sm text-neutral-500">
          Selected: {selectedUser ?? "none"}
        </Text>
      </Container>
    </Container>
    <CodeBlock id="searchable-selector-basic-code" code={codeBlockContents.searchableSelectorBasic} language="svelte" />
  </Container>

  <!-- 2. With Avatar Images -->
  <Container id="searchable-selector-images-section" class="flex flex-col gap-2">
    <Text id="searchable-selector-images-heading" type="h3" class="text-xl font-bold">2. With Avatar Images</Text>
    <Text id="searchable-selector-images-description" class="text-neutral-500">Uses avatarImage URL for circle avatar instead of initials. Falls back to initials if no image.</Text>
    <Container id="searchable-selector-images-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="searchable-selector-images-wrapper" class="max-w-sm">
        <SearchableSelector
          id="searchable-selector-images-demo"
          items={imageItems}
          bind:selectedValue={selectedWithImages}
          placeholder="Choose a person"
          searchPlaceholder="Search people..."
        />
        <Text id="searchable-selector-images-status" class="mt-3 text-sm text-neutral-500">
          Selected: {selectedWithImages ?? "none"}
        </Text>
      </Container>
    </Container>
    <CodeBlock id="searchable-selector-images-code" code={codeBlockContents.searchableSelectorImages} language="svelte" />
  </Container>
</Container>
