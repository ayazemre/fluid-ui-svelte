<script lang="ts">
  import { Container, Button, Text } from "#src/lib/base/index.ts";
  import { applyDate, generateCalendarCellStyles, generateDaysOfTheMonthFromDate } from "#src/lib/utilities/datePicker.ts";

  let {
    variant = "",
    componentId,
    currentDate = new Date().toISOString(),
    startDate = $bindable(),
    endDate = $bindable(),
    weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    calendarDays = generateDaysOfTheMonthFromDate(new Date().toISOString()),
    hideRollingDays = false,
  }: {
    variant?: string;
    componentId?: string;
    currentDate?: string;
    startDate?: string;
    endDate?: string;
    weekDays?: Array<string>;
    calendarDays?: Array<string>;
    hideRollingDays?: boolean;
  } = $props();

  function dateSelectionHandler(selectedDate: string) {
    const result = applyDate({ endDate: endDate, startDate }, selectedDate);
    startDate = result.startDate;
    endDate = result.endDate;
  }

  $effect(() => {
    calendarDays = generateDaysOfTheMonthFromDate(currentDate);
  });
</script>

<Container id={componentId} class={[variant, "fluid-calendar-wrapper", "flex", "flex-col"].join(" ")}>
  <Container class={[variant, "fluid-calendar-header", "flex", "w-full"].join(" ")}>
    <Text>{new Date(currentDate).toLocaleString("default", { month: "long" })}</Text>
  </Container>
  <Container class={[variant, "fluid-calendar-body", "grid", "grid-cols-7", "justify-items-center"].join(" ")}>
    {#each weekDays as day}
      <Text>{day}</Text>
    {/each}

    {#each calendarDays as cellDay}
      <Button
        onclick={async () => dateSelectionHandler(cellDay)}
        class={[variant, ...generateCalendarCellStyles(currentDate, cellDay, startDate, endDate, hideRollingDays)].join(" ")}
      >
        {new Date(cellDay).getDate()}
      </Button>
    {/each}
  </Container>
</Container>
