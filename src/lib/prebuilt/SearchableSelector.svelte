<script lang="ts">
  import { Button, Container, Image, InputField, Text } from "../base/index.ts";
  import { AnchoredOverlay } from "../components/index.ts";
  import {
    filterSearchableSelectorItems,
    getSearchableSelectorAvatarBackground,
    getSearchableSelectorInitials,
    getSelectedSearchableSelectorItem,
    type SearchableSelectorItem,
  } from "../prebuilt/searchableSelector.ts";

  let {
    id,
    items,
    selectedValue = $bindable<string | undefined>(undefined),
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    disabled = false,
    variant = "",
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

<Container id={`fluid-searchable-selector-${id}`} class={["fluid-searchable-selector", variant].join(" ")}>
  <AnchoredOverlay id={`${id}-selector-overlay`} position="bottom-start" closeOnClickOutside={true} closeOnEscape={true}>
    {#snippet anchor({ toggle })}
      <Button
        id={`fluid-searchable-selector-trigger-${id}`}
        type="button"
        onclick={async () => toggle()}
        {disabled}
        class={["fluid-searchable-selector-trigger", disabled ? "fluid-searchable-selector-disabled" : ""].join(" ")}
      >
        <Container id={`fluid-searchable-selector-trigger-content-${id}`} class="fluid-searchable-selector-trigger-content">
          {#if selectedItem !== undefined}
            <Container
              id={`fluid-searchable-selector-avatar-trigger-${id}`}
              class={[
                "fluid-searchable-selector-avatar",
                selectedItem.avatarImage ? "fluid-searchable-selector-avatar-framed" : getSearchableSelectorAvatarBackground(selectedItem.label),
              ].join(" ")}
            >
              {#if selectedItem.avatarImage}
                <Image
                  id={`fluid-searchable-selector-avatar-image-trigger-${id}`}
                  src={selectedItem.avatarImage}
                  alt={selectedItem.label}
                  class="fluid-searchable-selector-avatar-image"
                />
              {:else}
                <Text id={`fluid-searchable-selector-avatar-text-trigger-${id}`} type="span" class="fluid-searchable-selector-avatar-text"
                  >{getSearchableSelectorInitials(selectedItem.label, selectedItem.avatarText)}</Text
                >
              {/if}
            </Container>
            <Text id={`fluid-searchable-selector-label-${id}`} type="span" class="fluid-searchable-selector-label">{selectedItem.label}</Text>
          {:else}
            <Container
              id={`fluid-searchable-selector-avatar-placeholder-${id}`}
              class="fluid-searchable-selector-avatar fluid-searchable-selector-avatar-empty"
            ></Container>
            <Text id={`fluid-searchable-selector-placeholder-${id}`} type="span" class="fluid-searchable-selector-placeholder">{placeholder}</Text>
          {/if}
        </Container>
        <Container id={`fluid-searchable-selector-arrow-${id}`} class="fluid-searchable-selector-arrow">
          <span class="fluid-searchable-selector-chevron" aria-hidden="true"></span>
        </Container>
      </Button>
    {/snippet}

    {#snippet overlay({ close })}
      <InputField
        id={`fluid-searchable-selector-search-${id}`}
        bind:value={searchQuery}
        placeholder={searchPlaceholder}
        class="fluid-searchable-selector-search"
      />

      <Container id={`fluid-searchable-selector-list-${id}`} class="fluid-searchable-selector-list">
        {#each filteredItems as item (item.value)}
          <Button
            id={`fluid-searchable-selector-option-${item.value}-${id}`}
            type="button"
            onclick={async () => {
              selectedValue = item.value;
              searchQuery = "";
              close();
            }}
            class={["fluid-searchable-selector-option", selectedValue === item.value ? "fluid-searchable-selector-option-selected" : ""].join(" ")}
          >
            <Container
              id={`fluid-searchable-selector-avatar-option-${item.value}-${id}`}
              class={[
                "fluid-searchable-selector-avatar",
                item.avatarImage ? "fluid-searchable-selector-avatar-framed" : getSearchableSelectorAvatarBackground(item.label),
              ].join(" ")}
            >
              {#if item.avatarImage}
                <Image
                  id={`fluid-searchable-selector-avatar-image-option-${item.value}-${id}`}
                  src={item.avatarImage}
                  alt={item.label}
                  class="fluid-searchable-selector-avatar-image"
                />
              {:else}
                <Text
                  id={`fluid-searchable-selector-avatar-text-option-${item.value}-${id}`}
                  type="span"
                  class="fluid-searchable-selector-avatar-text">{getSearchableSelectorInitials(item.label, item.avatarText)}</Text
                >
              {/if}
            </Container>
            <Text id={`fluid-searchable-selector-option-label-${item.value}-${id}`} type="span" class="fluid-searchable-selector-option-label"
              >{item.label}</Text
            >
            {#if selectedValue === item.value}
              <Container id={`fluid-searchable-selector-check-${item.value}-${id}`} class="fluid-searchable-selector-check">
                <span class="fluid-searchable-selector-check-mark" aria-hidden="true"></span>
              </Container>
            {/if}
          </Button>
        {:else}
          <Container id={`fluid-searchable-selector-empty-${id}`} class="fluid-searchable-selector-empty">
            <Text id={`fluid-searchable-selector-empty-text-${id}`} class="fluid-searchable-selector-empty-text">No results found</Text>
          </Container>
        {/each}
      </Container>
    {/snippet}
  </AnchoredOverlay>
</Container>
