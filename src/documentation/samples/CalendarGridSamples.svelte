<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { CalendarGrid, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  // Example 1: Single Month State
  let singleCalendarDate = $state(Temporal.Now.plainDateISO().toString());
  const changeSingleMonth = (monthIncrement: number) => {
    singleCalendarDate = Temporal.PlainDate.from(singleCalendarDate).add({ months: monthIncrement }).toString();
  };

  // Example 2: Multi Calendar State
  const multiCalendarState = $state({
    currentDate: Temporal.Now.plainDateISO().toString(),
    endDate: "",
    startDate: "",
  });

  const changeMultiMonth = (monthIncrement: number) => {
    multiCalendarState.currentDate = Temporal.PlainDate.from(multiCalendarState.currentDate).add({ months: monthIncrement }).toString();
  };
</script>

<Container class="flex flex-col gap-10">
  <!-- 1. Single Month -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Single Month with External Navigation</Text>
    <Text class="text-neutral-500">
      Control the displayed month by updating the <Text type="code">currentDate</Text> prop from outside.
    </Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="mb-4 flex gap-2">
        <Button class="fluid-button-secondary" onclick={async () => changeSingleMonth(-1)}>Prev</Button>
        <Button class="fluid-button-secondary" onclick={async () => changeSingleMonth(1)}>Next</Button>
      </Container>
      <Container class="max-w-sm rounded border p-4 dark:border-neutral-800">
        <CalendarGrid currentDate={singleCalendarDate} componentId="calendar-single" />
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.calendarGridSingle} language="svelte" />
  </Container>

  <!-- 2. Multi Calendar -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Multi Calendar</Text>
    <Text class="text-neutral-500">Connect multiple calendar grids to the same range state variables.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="mb-4 flex gap-2">
        <Button class="fluid-button-secondary" onclick={async () => changeMultiMonth(-1)}>Prev</Button>
        <Button class="fluid-button-secondary" onclick={async () => changeMultiMonth(1)}>Next</Button>
      </Container>
      <Container class="flex flex-wrap gap-8">
        <Container class="max-w-sm rounded border p-4 dark:border-neutral-800">
          <CalendarGrid
            currentDate={multiCalendarState.currentDate}
            bind:startDate={multiCalendarState.startDate}
            bind:endDate={multiCalendarState.endDate}
            componentId="calendar-multi-1"
          />
        </Container>
        <Container class="max-w-sm rounded border p-4 dark:border-neutral-800">
          <CalendarGrid
            currentDate={Temporal.PlainDate.from(multiCalendarState.currentDate).add({ months: 1 }).toString()}
            bind:startDate={multiCalendarState.startDate}
            bind:endDate={multiCalendarState.endDate}
            componentId="calendar-multi-2"
          />
        </Container>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.calendarGridMulti} language="svelte" />
  </Container>
</Container>
