<script lang="ts">
  import { Button, Container, InputField } from "#src/lib/base/index.ts";
  import { AnchoredOverlay } from "#src/lib/components/index.ts";
  import {
    filterCountryEntries,
    getCountryData,
    getPlaceholderForMode,
    getTriggerDisplay,
    type InternationalInputMode,
  } from "#src/lib/prebuilt/internationalInput.ts";

  let {
    componentId,
    mode = "phone",
    selectedCountry = $bindable("US"),
    dialCode = $bindable("+1"),
    value = $bindable(""),
    placeholder,
    searchPlaceholder = "Search country...",
    disabled = false,
    variant = "",
  }: {
    componentId: string;
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
  id={componentId}
  overrideDefaultStyling={true}
  class={[
    "flex items-center rounded-lg border border-neutral-300 bg-white transition-all focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900",
    mode === "country" ? "w-auto inline-flex" : "",
    disabled ? "opacity-60 pointer-events-none" : "",
    variant,
  ].join(" ")}
>
  <AnchoredOverlay
    componentId="{componentId}-country-selector"
    position="bottom-start"
    overlayClass="flex w-64 flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 z-50"
    closeOnClickOutside={true}
    closeOnEscape={true}
  >
    {#snippet anchor()}
      <Button
        type="button"
        overrideDefaultStyling={true}
        class={[
          "flex items-center gap-2 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
          mode === "country" ? "rounded-lg justify-between min-w-50" : "rounded-l-lg border-r border-neutral-200 dark:border-neutral-700",
        ].join(" ")}
      >
        <span class="flex items-center gap-2">
          <span class="text-base">{triggerInfo.flag}</span>
          <span class="text-xs">{triggerInfo.label}</span>
        </span>
        <span class="text-[10px] text-neutral-400">&darr;</span>
      </Button>
    {/snippet}

    {#snippet overlay({ close })}
      <InputField
        id="{componentId}-search-input"
        bind:value={searchQuery}
        placeholder={searchPlaceholder}
        class="rounded-md border border-neutral-200 px-2 py-1 text-xs dark:border-neutral-700"
      />

      <Container overrideDefaultStyling={true} class="flex max-h-48 flex-col gap-0.5 overflow-y-auto">
        {#each filteredCountries as { isoCode, data } (isoCode)}
          <Button
            type="button"
            overrideDefaultStyling={true}
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
              "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
              selectedCountry.toUpperCase() === isoCode ? "bg-neutral-100 dark:bg-neutral-800 font-semibold" : "",
            ].join(" ")}
          >
            <span class="flex items-center gap-2 truncate">
              <span class="text-sm">{data.flag}</span>
              <span class="truncate text-neutral-800 dark:text-neutral-200">{data.name}</span>
            </span>
            <span class="ml-2 shrink-0 text-neutral-400">
              {mode === "phone" ? data.dialCode : mode === "currency" ? data.currency : isoCode}
            </span>
          </Button>
        {/each}
      </Container>
    {/snippet}
  </AnchoredOverlay>

  {#if mode !== "country"}
    <InputField
      id="{componentId}-input"
      {value}
      oninput={(event) => {
        const raw = (event.target as HTMLInputElement).value;
        if (mode === "phone") {
          value = raw.replace(/\D/g, "");
        } else {
          value = raw;
        }
      }}
      type={"text"}
      placeholder={getPlaceholderForMode(mode, currentCountry, placeholder)}
      {disabled}
      overrideDefaultStyling={true}
      class="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 dark:text-neutral-50"
    />
  {/if}
</Container>
