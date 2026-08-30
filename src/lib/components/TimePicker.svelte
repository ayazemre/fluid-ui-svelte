<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import {
    formatTimeString,
    generateHours,
    generateMinutes,
    generateSeconds,
    getTimePickerCellStyles,
    parseTimeString,
    type TimeFormat,
    type TimePickerMode,
  } from "#src/lib/components/timePicker.ts";

  let {
    componentId,
    mode = "minute",
    selectedTime = $bindable("12:00"),
    format = "24h",
    stepMinuteInterval = 5,
    stepSecondInterval = 5,
    showHeader = true,
    variant = "",
  }: {
    componentId: string;
    mode?: TimePickerMode;
    selectedTime?: string;
    format?: TimeFormat;
    stepMinuteInterval?: number;
    stepSecondInterval?: number;
    showHeader?: boolean;
    variant?: string;
  } = $props();

  let parsedTime = $derived(parseTimeString(selectedTime, format));
  let availableHours = $derived(generateHours(format));
  let availableMinutes = $derived(generateMinutes(stepMinuteInterval));
  let availableSeconds = $derived(generateSeconds(stepSecondInterval));
</script>

<Container
  id={componentId}
  overrideDefaultStyling={true}
  class={[
    "fluid-timepicker-wrapper flex flex-col rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
    variant,
  ].join(" ")}
>
  {#if showHeader}
    <Container
      overrideDefaultStyling={true}
      class="fluid-timepicker-header mb-2 flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-neutral-800"
    >
      <Text class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {mode === "hour" ? "Hour" : "Time"}
      </Text>
      <Text class="text-xs font-medium text-neutral-700 dark:text-neutral-200">
        {selectedTime}
      </Text>
    </Container>
  {/if}

  <Container overrideDefaultStyling={true} class="fluid-timepicker-body flex items-stretch gap-1.5">
    <!-- Hours Column -->
    <Container overrideDefaultStyling={true} class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5 [scrollbar-width:thin]">
      {#each availableHours as hourItem (hourItem)}
        <Button
          type="button"
          overrideDefaultStyling={true}
          onclick={async () => {
            selectedTime = formatTimeString(hourItem, parsedTime.minute, parsedTime.period, parsedTime.second, mode);
          }}
          class={[
            "flex h-8 w-full items-center justify-center text-xs transition-colors",
            ...getTimePickerCellStyles(parsedTime.hour === hourItem),
          ].join(" ")}
        >
          {hourItem}
        </Button>
      {/each}
    </Container>

    <!-- Minutes Column -->
    {#if mode === "minute" || mode === "second"}
      <Container overrideDefaultStyling={true} class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5 [scrollbar-width:thin]">
        {#each availableMinutes as minuteItem (minuteItem)}
          <Button
            type="button"
            overrideDefaultStyling={true}
            onclick={async () => {
              selectedTime = formatTimeString(parsedTime.hour, minuteItem, parsedTime.period, parsedTime.second, mode);
            }}
            class={[
              "flex h-8 w-full items-center justify-center text-xs transition-colors",
              ...getTimePickerCellStyles(parsedTime.minute === minuteItem),
            ].join(" ")}
          >
            {minuteItem}
          </Button>
        {/each}
      </Container>
    {/if}

    <!-- Seconds Column -->
    {#if mode === "second"}
      <Container overrideDefaultStyling={true} class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5 [scrollbar-width:thin]">
        {#each availableSeconds as secondItem (secondItem)}
          <Button
            type="button"
            overrideDefaultStyling={true}
            onclick={async () => {
              selectedTime = formatTimeString(parsedTime.hour, parsedTime.minute, parsedTime.period, secondItem, mode);
            }}
            class={[
              "flex h-8 w-full items-center justify-center text-xs transition-colors",
              ...getTimePickerCellStyles(parsedTime.second === secondItem),
            ].join(" ")}
          >
            {secondItem}
          </Button>
        {/each}
      </Container>
    {/if}

    <!-- 12-Hour AM / PM Column -->
    {#if format === "12h"}
      <Container overrideDefaultStyling={true} class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5">
        {#each ["AM", "PM"] as const as periodItem (periodItem)}
          <Button
            type="button"
            overrideDefaultStyling={true}
            onclick={async () => {
              selectedTime = formatTimeString(parsedTime.hour, parsedTime.minute, periodItem, parsedTime.second, mode);
            }}
            class={[
              "flex h-8 w-full items-center justify-center text-xs transition-colors",
              ...getTimePickerCellStyles(parsedTime.period === periodItem),
            ].join(" ")}
          >
            {periodItem}
          </Button>
        {/each}
      </Container>
    {/if}
  </Container>
</Container>
