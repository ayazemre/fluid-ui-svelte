<script lang="ts">
  import { Button, Container, Text } from "#src/lib//base/index.ts";
  import { addMonthsToIsoDateString, getCurrentIsoDateString } from "#src/lib/components/calendarGrid.ts";
  import { CalendarGrid, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let singleCalendarDate = $state(getCurrentIsoDateString());
  const changeSingleMonth = (monthIncrement: number) => {
    singleCalendarDate = addMonthsToIsoDateString(singleCalendarDate, monthIncrement);
  };

  const multiCalendarState = $state({
    currentDate: getCurrentIsoDateString(),
    endDate: "",
    startDate: "",
  });

  const changeMultiMonth = (monthIncrement: number) => {
    multiCalendarState.currentDate = addMonthsToIsoDateString(multiCalendarState.currentDate, monthIncrement);
  };
</script>

<Container id="calendar-grid-samples-container" class="flex flex-col gap-10">
  <!-- 1. Single Month -->
  <Container id="calendar-grid-sample-single-section" class="flex flex-col gap-4">
    <Text id="calendar-grid-sample-single-heading" type="h3" class="text-xl font-bold">1. Single Month with External Navigation</Text>
    <Text id="calendar-grid-sample-single-description" class="text-neutral-500">
      Control the displayed month by updating the <Text id="calendar-grid-sample-single-desc-code" type="code">currentDate</Text> prop from outside.
    </Text>
    <Container id="calendar-grid-sample-single-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="calendar-grid-sample-single-nav" class="mb-4 flex gap-2">
        <Button id="calendar-grid-single-prev-btn" class="fluid-button-secondary" onclick={async () => changeSingleMonth(-1)}>Prev</Button>
        <Button id="calendar-grid-single-next-btn" class="fluid-button-secondary" onclick={async () => changeSingleMonth(1)}>Next</Button>
      </Container>
      <Container id="calendar-grid-sample-single-wrapper" class="max-w-sm rounded border p-4 dark:border-neutral-800">
        <CalendarGrid id="calendar-single" currentDate={singleCalendarDate} />
      </Container>
    </Container>
    <CodeBlock id="calendar-grid-sample-single-code" sourceCode={codeBlockContents.calendarGridSingle} language="svelte" />
  </Container>

  <!-- 2. Multi Calendar -->
  <Container id="calendar-grid-sample-multi-section" class="flex flex-col gap-4">
    <Text id="calendar-grid-sample-multi-heading" type="h3" class="text-xl font-bold">2. Multi Calendar</Text>
    <Text id="calendar-grid-sample-multi-description" class="text-neutral-500"
      >Connect multiple calendar grids to the same range state variables.</Text
    >
    <Container id="calendar-grid-sample-multi-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="calendar-grid-sample-multi-nav" class="mb-4 flex gap-2">
        <Button id="calendar-grid-multi-prev-btn" class="fluid-button-secondary" onclick={async () => changeMultiMonth(-1)}>Prev</Button>
        <Button id="calendar-grid-multi-next-btn" class="fluid-button-secondary" onclick={async () => changeMultiMonth(1)}>Next</Button>
      </Container>
      <Container id="calendar-grid-sample-multi-grid" class="flex flex-wrap gap-8">
        <Container id="calendar-grid-sample-multi-1-wrapper" class="max-w-sm rounded border p-4 dark:border-neutral-800">
          <CalendarGrid
            id="calendar-multi-1"
            currentDate={multiCalendarState.currentDate}
            bind:startDate={multiCalendarState.startDate}
            bind:endDate={multiCalendarState.endDate}
          />
        </Container>
        <Container id="calendar-grid-sample-multi-2-wrapper" class="max-w-sm rounded border p-4 dark:border-neutral-800">
          <CalendarGrid
            id="calendar-multi-2"
            currentDate={addMonthsToIsoDateString(multiCalendarState.currentDate, 1)}
            bind:startDate={multiCalendarState.startDate}
            bind:endDate={multiCalendarState.endDate}
          />
        </Container>
      </Container>
    </Container>
    <CodeBlock id="calendar-grid-sample-multi-code" sourceCode={codeBlockContents.calendarGridMulti} language="svelte" />
  </Container>
</Container>
