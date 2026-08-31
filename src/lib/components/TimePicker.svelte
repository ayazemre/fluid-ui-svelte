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
    id,
    mode = "minute",
    selectedTime = $bindable("12:00"),
    format = "24h",
    stepMinuteInterval = 5,
    stepSecondInterval = 5,
    showHeader = true,
    variant = "",
  }: {
    id: string;
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
  {id}
  overrideDefaultStyling={true}
  class={[
    "fluid-timepicker-wrapper flex flex-col rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
    variant,
  ].join(" ")}
>
  {#if showHeader}
    <Container
      id={`${id}-header`}
      overrideDefaultStyling={true}
      class="fluid-timepicker-header mb-2 flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-neutral-800"
    >
      <Text id={`${id}-header-mode-label`} class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {mode === "hour" ? "Hour" : "Time"}
      </Text>
      <Text id={`${id}-header-selected-time`} class="text-xs font-medium text-neutral-700 dark:text-neutral-200">
        {selectedTime}
      </Text>
    </Container>
  {/if}

  <Container id={`${id}-body`} overrideDefaultStyling={true} class="fluid-timepicker-body flex items-stretch gap-1.5">
    <!-- Hours Column -->
    <Container
      id={`${id}-hours-column`}
      overrideDefaultStyling={true}
      class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5 [scrollbar-width:thin]"
    >
      {#each availableHours as hourItem (hourItem)}
        <Button
          id={`${id}-hour-option-${hourItem}`}
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
      <Container
        id={`${id}-minutes-column`}
        overrideDefaultStyling={true}
        class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5 [scrollbar-width:thin]"
      >
        {#each availableMinutes as minuteItem (minuteItem)}
          <Button
            id={`${id}-minute-option-${minuteItem}`}
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
      <Container
        id={`${id}-seconds-column`}
        overrideDefaultStyling={true}
        class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5 [scrollbar-width:thin]"
      >
        {#each availableSeconds as secondItem (secondItem)}
          <Button
            id={`${id}-second-option-${secondItem}`}
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
      <Container id={`${id}-period-column`} overrideDefaultStyling={true} class="flex max-h-48 w-12 flex-col gap-1 overflow-y-auto px-0.5">
        {#each ["AM", "PM"] as const as periodItem (periodItem)}
          <Button
            id={`${id}-period-option-${periodItem}`}
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
