<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, TimePicker } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let hourOnlyTime = $state("14");
  let minuteTime = $state("14:30");
  let secondsTime = $state("14:30:45");
  let twelveHourTime = $state("02:30 PM");
</script>

<Container id="time-picker-samples-container" class="flex flex-col gap-10">
  <!-- 1. Hour Only Mode -->
  <Container id="time-picker-sample-hour-section" class="flex flex-col gap-4">
    <Text id="time-picker-sample-hour-heading" type="h3" class="text-xl font-bold">1. Hour Only Mode</Text>
    <Text id="time-picker-sample-hour-description" class="text-neutral-500"
      >Renders only the hour column for hourly scheduling or timeframe selection.</Text
    >
    <Container id="time-picker-sample-hour-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="time-picker-sample-hour-wrapper" class="flex flex-col items-start gap-3">
        <TimePicker id="time-picker-demo-hour-only" mode="hour" bind:selectedTime={hourOnlyTime} />
        <Text id="time-picker-sample-hour-selected-text" class="text-sm text-neutral-500">
          Selected Hour: <Text id="time-picker-sample-hour-value" type="span" class="font-medium text-neutral-900 dark:text-neutral-100"
            >{hourOnlyTime}:00</Text
          >
        </Text>
      </Container>
    </Container>
    <CodeBlock id="time-picker-sample-hour-code" code={codeBlockContents.timePickerHourOnly} language="svelte" />
  </Container>

  <!-- 2. Standard Hour & Minute Mode -->
  <Container id="time-picker-sample-minute-section" class="flex flex-col gap-4">
    <Text id="time-picker-sample-minute-heading" type="h3" class="text-xl font-bold">2. Standard Hour & Minute Mode</Text>
    <Text id="time-picker-sample-minute-description" class="text-neutral-500"
      >Select hours and minutes in 24-hour format with customizable minute intervals.</Text
    >
    <Container id="time-picker-sample-minute-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="time-picker-sample-minute-wrapper" class="flex flex-col items-start gap-3">
        <TimePicker id="time-picker-demo-minute" mode="minute" bind:selectedTime={minuteTime} stepMinuteInterval={5} />
        <Text id="time-picker-sample-minute-selected-text" class="text-sm text-neutral-500">
          Selected Time: <Text id="time-picker-sample-minute-value" type="span" class="font-medium text-neutral-900 dark:text-neutral-100"
            >{minuteTime}</Text
          >
        </Text>
      </Container>
    </Container>
    <CodeBlock id="time-picker-sample-minute-code" code={codeBlockContents.timePickerBasic} language="svelte" />
  </Container>

  <!-- 3. Precise Seconds Mode -->
  <Container id="time-picker-sample-seconds-section" class="flex flex-col gap-4">
    <Text id="time-picker-sample-seconds-heading" type="h3" class="text-xl font-bold">3. Precise Seconds Mode</Text>
    <Text id="time-picker-sample-seconds-description" class="text-neutral-500"
      >Includes an additional column for selecting exact seconds with custom intervals.</Text
    >
    <Container id="time-picker-sample-seconds-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="time-picker-sample-seconds-wrapper" class="flex flex-col items-start gap-3">
        <TimePicker id="time-picker-demo-seconds" mode="second" bind:selectedTime={secondsTime} stepSecondInterval={5} />
        <Text id="time-picker-sample-seconds-selected-text" class="text-sm text-neutral-500">
          Selected Time: <Text id="time-picker-sample-seconds-value" type="span" class="font-medium text-neutral-900 dark:text-neutral-100"
            >{secondsTime}</Text
          >
        </Text>
      </Container>
    </Container>
    <CodeBlock id="time-picker-sample-seconds-code" code={codeBlockContents.timePickerWithSeconds} language="svelte" />
  </Container>

  <!-- 4. 12-Hour AM/PM Format -->
  <Container id="time-picker-sample-12h-section" class="flex flex-col gap-4">
    <Text id="time-picker-sample-12h-heading" type="h3" class="text-xl font-bold">4. 12-Hour Format with AM / PM</Text>
    <Text id="time-picker-sample-12h-description" class="text-neutral-500"
      >Supports standard 12-hour period selection with dedicated AM and PM selector buttons.</Text
    >
    <Container id="time-picker-sample-12h-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="time-picker-sample-12h-wrapper" class="flex flex-col items-start gap-3">
        <TimePicker id="time-picker-demo-12h" format="12h" mode="minute" bind:selectedTime={twelveHourTime} stepMinuteInterval={15} />
        <Text id="time-picker-sample-12h-selected-text" class="text-sm text-neutral-500">
          Selected Time: <Text id="time-picker-sample-12h-value" type="span" class="font-medium text-neutral-900 dark:text-neutral-100"
            >{twelveHourTime}</Text
          >
        </Text>
      </Container>
    </Container>
    <CodeBlock id="time-picker-sample-12h-code" code={codeBlockContents.timePickerTwelveHour} language="svelte" />
  </Container>
</Container>
