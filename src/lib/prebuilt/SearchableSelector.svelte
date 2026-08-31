<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Button, Container, Image, InputField, Text } from "#src/lib/base/index.ts";
  import { AnchoredOverlay } from "#src/lib/components/index.ts";
  import {
    filterSearchableSelectorItems,
    getSearchableSelectorAvatarBackground,
    getSearchableSelectorInitials,
    getSelectedSearchableSelectorItem,
    type SearchableSelectorItem
  } from "#src/lib/prebuilt/searchableSelector.ts";

  let {
    id,
    items,
    selectedValue = $bindable<string | undefined>(undefined),
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    disabled = false,
    variant = ""
  }: {
    id: string;
    items: Array<SearchableSelectorItem>;
    selectedValue?: string | undefined;
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    variant?: string;
  } = $props();

  let searchQuery = $state("");

  let selectedItem = $derived(getSelectedSearchableSelectorItem(items, selectedValue));
  let filteredItems = $derived(filterSearchableSelectorItems(items, searchQuery));
</script>

<Container
  {id}
  overrideDefaultStyling={true}
  class={["inline-flex w-full", variant].join(" ")}
>
  <AnchoredOverlay
    id={`${id}-selector-overlay`}
    position="bottom-start"
    overlayClass="flex w-[320px] flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 z-50"
    closeOnClickOutside={true}
    closeOnEscape={true}
  >
    {#snippet anchor({ toggle })}
      <Button
        id={`${id}-trigger-button`}
        type="button"
        overrideDefaultStyling={true}
        onclick={async () => toggle()}
        disabled={disabled}
        class={[
          "flex w-full items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-left transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800",
          disabled ? "opacity-60 pointer-events-none" : "",
          "fluid-searchable-selector-trigger"
        ].join(" ")}
      >
        <Container id={`${id}-trigger-content`} overrideDefaultStyling={true} class="flex items-center gap-3 truncate">
          {#if selectedItem !== undefined}
            <Container
              id={`${id}-trigger-avatar`}
              overrideDefaultStyling={true}
              class={["flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white", selectedItem.avatarImage ? "overflow-hidden p-0" : getSearchableSelectorAvatarBackground(selectedItem.label)].join(" ")}
            >
              {#if selectedItem.avatarImage}
                <Image id={`${id}-trigger-avatar-image`} src={selectedItem.avatarImage} alt={selectedItem.label} overrideDefaultStyling={true} class="h-8 w-8 rounded-full object-cover" />
              {:else}
                <Text id={`${id}-trigger-avatar-text`} type="span">{getSearchableSelectorInitials(selectedItem.label, selectedItem.avatarText)}</Text>
              {/if}
            </Container>
            <Text id={`${id}-trigger-label`} type="span" class="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{selectedItem.label}</Text>
          {:else}
            <Container id={`${id}-trigger-avatar-placeholder`} overrideDefaultStyling={true} class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              <Icon icon="mdi:account-outline" width="16" height="16"></Icon>
            </Container>
            <Text id={`${id}-trigger-placeholder`} type="span" class="truncate text-sm text-neutral-500 dark:text-neutral-400">{placeholder}</Text>
          {/if}
        </Container>
        <Container id={`${id}-trigger-arrow`} overrideDefaultStyling={true} class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-neutral-400">
          <Icon icon="mdi:unfold-more-horizontal" width="18" height="18"></Icon>
        </Container>
      </Button>
    {/snippet}

    {#snippet overlay({ close })}
      <InputField
        id={`${id}-search-input`}
        bind:value={searchQuery}
        placeholder={searchPlaceholder}
        class="rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-700"
      />

      <Container id={`${id}-option-list`} overrideDefaultStyling={true} class="flex max-h-64 flex-col gap-0.5 overflow-y-auto">
        {#each filteredItems as item (item.value)}
          <Button
            id={`${id}-option-${item.value}-button`}
            type="button"
            overrideDefaultStyling={true}
            onclick={async () => {
              selectedValue = item.value;
              searchQuery = "";
              close();
            }}
            class={[
              "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
              selectedValue === item.value ? "bg-neutral-100 dark:bg-neutral-800 font-medium" : ""
            ].join(" ")}
          >
            <Container
              id={`${id}-option-${item.value}-avatar`}
              overrideDefaultStyling={true}
              class={["flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white", item.avatarImage ? "overflow-hidden p-0" : getSearchableSelectorAvatarBackground(item.label)].join(" ")}
            >
              {#if item.avatarImage}
                <Image id={`${id}-option-${item.value}-avatar-image`} src={item.avatarImage} alt={item.label} overrideDefaultStyling={true} class="h-8 w-8 rounded-full object-cover" />
              {:else}
                <Text id={`${id}-option-${item.value}-avatar-text`} type="span">{getSearchableSelectorInitials(item.label, item.avatarText)}</Text>
              {/if}
            </Container>
            <Text id={`${id}-option-${item.value}-label`} type="span" class="flex-1 truncate text-sm text-neutral-800 dark:text-neutral-200">{item.label}</Text>
            {#if selectedValue === item.value}
              <Container id={`${id}-option-${item.value}-check`} overrideDefaultStyling={true} class="flex h-5 w-5 shrink-0 items-center justify-center text-primary-600">
                <Icon icon="mdi:check" width="16" height="16"></Icon>
              </Container>
            {/if}
          </Button>
        {:else}
          <Container id={`${id}-empty-state`} overrideDefaultStyling={true} class="flex flex-col items-center gap-2 py-8">
            <Text id={`${id}-empty-text`} class="text-sm text-neutral-500">No results found</Text>
          </Container>
        {/each}
      </Container>
    {/snippet}
  </AnchoredOverlay>
</Container>
