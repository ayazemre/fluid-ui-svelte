<script lang="ts">
  import { Button, Container, InputField, Text } from "../base/index.ts";
  import { AnchoredOverlay } from "../components/index.ts";
  import {
    filterCountryEntries,
    getCountryData,
    getPlaceholderForMode,
    getTriggerDisplay,
    type InternationalInputMode,
  } from "../prebuilt/internationalInput.ts";

  let {
    id,
    mode = "phone",
    selectedCountry = $bindable("US"),
    dialCode = $bindable("+1"),
    value = $bindable(""),
    placeholder,
    searchPlaceholder = "Search country...",
    disabled = false,
    variant = "",
  }: {
    id: string;
    mode?: InternationalInputMode;
    selectedCountry?: string;
    dialCode?: string;
    value?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    variant?: string;
  } = $props();

  let searchQuery = $state("");

  let currentCountry = $derived(getCountryData(selectedCountry));
  let triggerInfo = $derived(getTriggerDisplay(mode, selectedCountry, currentCountry));
  let filteredCountries = $derived(filterCountryEntries(searchQuery));

  $effect(() => {
    dialCode = currentCountry.dialCode;
    if (mode === "country") {
      value = currentCountry.name;
    }
  });
</script>

<Container
  id={`fluid-international-input-${id}`}
  class={[
    "fluid-international-input",
    mode === "country" ? "fluid-international-input-country" : "",
    disabled ? "fluid-international-input-disabled" : "",
    variant,
  ].join(" ")}
>
  <AnchoredOverlay id={`${id}-country-selector`} position="bottom-start" closeOnClickOutside={true} closeOnEscape={true}>
    {#snippet anchor({ toggle })}
      <Button
        id={`fluid-international-input-trigger-${id}`}
        type="button"
        onclick={async () => toggle()}
        {disabled}
        class={[
          "fluid-international-input-trigger",
          mode === "country" ? "fluid-international-input-trigger-country" : "fluid-international-input-trigger-code",
        ].join(" ")}
      >
        <Text id={`fluid-international-input-display-${id}`} type="span" class="fluid-international-input-display">
          <Text id={`fluid-international-input-flag-${id}`} type="span" class="fluid-international-input-flag">{triggerInfo.flag}</Text>
          <Text id={`fluid-international-input-label-${id}`} type="span" class="fluid-international-input-label">{triggerInfo.label}</Text>
        </Text>
        <Text id={`fluid-international-input-arrow-${id}`} type="span" class="fluid-international-input-arrow">&darr;</Text>
      </Button>
    {/snippet}

    {#snippet overlay({ close })}
      <InputField
        id={`fluid-international-input-search-${id}`}
        bind:value={searchQuery}
        placeholder={searchPlaceholder}
        class="fluid-international-input-search"
      />

      <Container id={`fluid-international-input-list-${id}`} class="fluid-international-input-list">
        {#each filteredCountries as { isoCode, data } (isoCode)}
          <Button
            id={`fluid-international-input-option-${isoCode}-${id}`}
            type="button"
            onclick={async () => {
              selectedCountry = isoCode;
              dialCode = data.dialCode;
              if (mode === "country") {
                value = data.name;
              } else if (mode === "timezone") {
                value = data.timezones[0] ?? "";
              }
              searchQuery = "";
              close();
            }}
            class={[
              "fluid-international-input-option",
              selectedCountry.toUpperCase() === isoCode ? "fluid-international-input-option-selected" : "",
            ].join(" ")}
          >
            <Text id={`fluid-international-input-option-info-${isoCode}-${id}`} type="span" class="fluid-international-input-option-info">
              <Text id={`fluid-international-input-option-flag-${isoCode}-${id}`} type="span" class="fluid-international-input-option-flag"
                >{data.flag}</Text
              >
              <Text id={`fluid-international-input-option-name-${isoCode}-${id}`} type="span" class="fluid-international-input-option-name"
                >{data.name}</Text
              >
            </Text>
            <Text id={`fluid-international-input-option-detail-${isoCode}-${id}`} type="span" class="fluid-international-input-option-detail">
              {mode === "phone" ? data.dialCode : mode === "currency" ? data.currency : isoCode}
            </Text>
          </Button>
        {/each}
      </Container>
    {/snippet}
  </AnchoredOverlay>

  {#if mode !== "country"}
    <InputField
      id={`fluid-international-input-field-${id}`}
      {value}
      oninput={(event: Event) => {
        const raw = (event.target as HTMLInputElement).value;
        if (mode === "phone") {
          value = raw.replace(/\D/g, "");
        } else {
          value = raw;
        }
      }}
      type="text"
      placeholder={getPlaceholderForMode(mode, currentCountry, placeholder)}
      {disabled}
      class="fluid-international-input-field"
    />
  {/if}
</Container>
