<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, TimePicker } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let hourOnlyTime = $state("14");
  let minuteTime = $state("14:30");
  let secondsTime = $state("14:30:45");
  let twelveHourTime = $state("02:30 PM");
</script>

<Container class="flex flex-col gap-10">
  <!-- 1. Hour Only Mode -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Hour Only Mode</Text>
    <Text class="text-neutral-500">Renders only the hour column for hourly scheduling or timeframe selection.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="flex flex-col items-start gap-3">
        <TimePicker componentId="time-picker-demo-hour-only" mode="hour" bind:selectedTime={hourOnlyTime} />
        <Text class="text-sm text-neutral-500">
          Selected Hour: <span class="font-medium text-neutral-900 dark:text-neutral-100">{hourOnlyTime}:00</span>
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.timePickerHourOnly} language="svelte" />
  </Container>

  <!-- 2. Standard Hour & Minute Mode -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Standard Hour & Minute Mode</Text>
    <Text class="text-neutral-500">Select hours and minutes in 24-hour format with customizable minute intervals.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="flex flex-col items-start gap-3">
        <TimePicker componentId="time-picker-demo-minute" mode="minute" bind:selectedTime={minuteTime} stepMinuteInterval={5} />
        <Text class="text-sm text-neutral-500">
          Selected Time: <span class="font-medium text-neutral-900 dark:text-neutral-100">{minuteTime}</span>
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.timePickerBasic} language="svelte" />
  </Container>

  <!-- 3. Precise Seconds Mode -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">3. Precise Seconds Mode</Text>
    <Text class="text-neutral-500">Includes an additional column for selecting exact seconds with custom intervals.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="flex flex-col items-start gap-3">
        <TimePicker componentId="time-picker-demo-seconds" mode="second" bind:selectedTime={secondsTime} stepSecondInterval={5} />
        <Text class="text-sm text-neutral-500">
          Selected Time: <span class="font-medium text-neutral-900 dark:text-neutral-100">{secondsTime}</span>
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.timePickerWithSeconds} language="svelte" />
  </Container>

  <!-- 4. 12-Hour AM/PM Format -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">4. 12-Hour Format with AM / PM</Text>
    <Text class="text-neutral-500">Supports standard 12-hour period selection with dedicated AM and PM selector buttons.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="flex flex-col items-start gap-3">
        <TimePicker componentId="time-picker-demo-12h" format="12h" mode="minute" bind:selectedTime={twelveHourTime} stepMinuteInterval={15} />
        <Text class="text-sm text-neutral-500">
          Selected Time: <span class="font-medium text-neutral-900 dark:text-neutral-100">{twelveHourTime}</span>
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.timePickerTwelveHour} language="svelte" />
  </Container>
</Container>
