<script lang="ts">
  import { Button, Container, Text } from "../base/index.ts";
  import {
    applyDate,
    generateCalendarCellStyles,
    generateDaysOfTheMonthFromDate,
    getCurrentIsoDateString,
    getDayNumberFromIsoDateString,
    getMonthNameFromIsoDateString,
  } from "./calendarGrid.ts";

  let {
    id,
    variant = "",
    currentDate = getCurrentIsoDateString(),
    startDate = $bindable(),
    endDate = $bindable(),
    weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    hideRollingDays = false,
  }: {
    id: string;
    variant?: string;
    currentDate?: string;
    startDate?: string;
    endDate?: string;
    weekDays?: Array<string>;
    hideRollingDays?: boolean;
  } = $props();

  const calendarDays = $derived(generateDaysOfTheMonthFromDate(currentDate));
  const monthName = $derived(getMonthNameFromIsoDateString(currentDate));

  function handleDateSelection(selectedDate: string): void {
    const result = applyDate({ endDate, startDate }, selectedDate);
    startDate = result.startDate;
    endDate = result.endDate;
  }
</script>

<Container id={`fluid-calendar-${id}`} class={["fluid-calendar", variant].join(" ")}>
  <Container id={`fluid-calendar-header-${id}`} class="fluid-calendar-header">
    <Text id={`fluid-calendar-title-${id}`} class="fluid-calendar-title">{monthName}</Text>
  </Container>
  <Container id={`fluid-calendar-body-${id}`} class="fluid-calendar-body">
    {#each weekDays as day}
      <Text id={`fluid-calendar-weekday-${day}-${id}`} class="fluid-calendar-weekday">{day}</Text>
    {/each}

    {#each calendarDays as cellDay}
      <Button
        id={`fluid-calendar-cell-${cellDay}-${id}`}
        onclick={async () => handleDateSelection(cellDay)}
        class={generateCalendarCellStyles(currentDate, cellDay, startDate, endDate, hideRollingDays).join(" ")}
      >
        {getDayNumberFromIsoDateString(cellDay)}
      </Button>
    {/each}
  </Container>
</Container>
