<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";

  import { applyDate, generateCalendarCellStyles, generateDaysOfTheMonthFromDate } from "./calendarGrid.ts";

  let {
    variant = "",
    componentId,
    currentDate = Temporal.Now.plainDateISO().toString(),
    startDate = $bindable(),
    endDate = $bindable(),
    weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    hideRollingDays = false,
  }: {
    variant?: string;
    componentId?: string;
    currentDate?: string;
    startDate?: string;
    endDate?: string;
    weekDays?: Array<string>;
    hideRollingDays?: boolean;
  } = $props();

  const calendarDays = $derived(generateDaysOfTheMonthFromDate(currentDate));
  const monthName = $derived(Temporal.PlainDate.from(currentDate).toLocaleString("default", { month: "long" }));

  function handleDateSelection(selectedDate: string): void {
    const result = applyDate({ endDate, startDate }, selectedDate);
    startDate = result.startDate;
    endDate = result.endDate;
  }
</script>

<Container id={componentId} class={[variant, "fluid-calendar-wrapper", "flex", "flex-col"].join(" ")}>
  <Container class={[variant, "fluid-calendar-header", "flex", "w-full"].join(" ")}>
    <Text>{monthName}</Text>
  </Container>
  <Container class={[variant, "fluid-calendar-body", "grid", "grid-cols-7", "justify-items-center"].join(" ")}>
    {#each weekDays as day}
      <Text>{day}</Text>
    {/each}

    {#each calendarDays as cellDay}
      <Button
        onclick={async () => handleDateSelection(cellDay)}
        class={[variant, ...generateCalendarCellStyles(currentDate, cellDay, startDate, endDate, hideRollingDays)].join(" ")}
      >
        {Temporal.PlainDate.from(cellDay).day}
      </Button>
    {/each}
  </Container>
</Container>
