<script lang="ts">
  import { Button, Container, Text } from "../base/index.ts";
  import {
    formatTimeString,
    generateHours,
    generateMinutes,
    generateSeconds,
    getTimePickerCellStyles,
    parseTimeString,
    type TimeFormat,
    type TimePickerMode,
  } from "../components/timePicker.ts";

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

<Container id={`fluid-time-picker-${id}`} class={["fluid-time-picker", variant].join(" ")}>
  {#if showHeader}
    <Container id={`fluid-time-picker-header-${id}`} class="fluid-time-picker-header">
      <Text id={`fluid-time-picker-mode-${id}`} class="fluid-time-picker-mode">
        {mode === "hour" ? "Hour" : "Time"}
      </Text>
      <Text id={`fluid-time-picker-selected-${id}`} class="fluid-time-picker-selected">
        {selectedTime}
      </Text>
    </Container>
  {/if}

  <Container id={`fluid-time-picker-body-${id}`} class="fluid-time-picker-body">
    <Container id={`fluid-time-picker-column-hours-${id}`} class="fluid-time-picker-column">
      {#each availableHours as hourItem (hourItem)}
        <Button
          id={`fluid-time-picker-cell-hour-${hourItem}-${id}`}
          type="button"
          onclick={async () => {
            selectedTime = formatTimeString(hourItem, parsedTime.minute, parsedTime.period, parsedTime.second, mode);
          }}
          class={getTimePickerCellStyles(parsedTime.hour === hourItem).join(" ")}
        >
          {hourItem}
        </Button>
      {/each}
    </Container>

    {#if mode === "minute" || mode === "second"}
      <Container id={`fluid-time-picker-column-minutes-${id}`} class="fluid-time-picker-column">
        {#each availableMinutes as minuteItem (minuteItem)}
          <Button
            id={`fluid-time-picker-cell-minute-${minuteItem}-${id}`}
            type="button"
            onclick={async () => {
              selectedTime = formatTimeString(parsedTime.hour, minuteItem, parsedTime.period, parsedTime.second, mode);
            }}
            class={getTimePickerCellStyles(parsedTime.minute === minuteItem).join(" ")}
          >
            {minuteItem}
          </Button>
        {/each}
      </Container>
    {/if}

    {#if mode === "second"}
      <Container id={`fluid-time-picker-column-seconds-${id}`} class="fluid-time-picker-column">
        {#each availableSeconds as secondItem (secondItem)}
          <Button
            id={`fluid-time-picker-cell-second-${secondItem}-${id}`}
            type="button"
            onclick={async () => {
              selectedTime = formatTimeString(parsedTime.hour, parsedTime.minute, parsedTime.period, secondItem, mode);
            }}
            class={getTimePickerCellStyles(parsedTime.second === secondItem).join(" ")}
          >
            {secondItem}
          </Button>
        {/each}
      </Container>
    {/if}

    {#if format === "12h"}
      <Container id={`fluid-time-picker-column-period-${id}`} class="fluid-time-picker-column">
        {#each ["AM", "PM"] as const as periodItem (periodItem)}
          <Button
            id={`fluid-time-picker-cell-period-${periodItem}-${id}`}
            type="button"
            onclick={async () => {
              selectedTime = formatTimeString(parsedTime.hour, parsedTime.minute, periodItem, parsedTime.second, mode);
            }}
            class={getTimePickerCellStyles(parsedTime.period === periodItem).join(" ")}
          >
            {periodItem}
          </Button>
        {/each}
      </Container>
    {/if}
  </Container>
</Container>
