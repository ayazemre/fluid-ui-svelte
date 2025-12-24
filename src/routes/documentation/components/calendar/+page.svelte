<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import Container from '$lib/base/Container.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const multiCalendarState = $state({
		currentDate: new Date().toISOString(),
		startDate: undefined,
		endDate: undefined
	});
</script>

<Page
	title="Calendar - Fluid UI"
	description="A date range picker component that displays a calendar grid for selecting start and end dates."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Calendar</Text>
			<Text>
				The Calendar component allows you to create an interactive date range picker. It displays a
				calendar grid where users can select start and end dates, making it useful for booking
				systems, filters, reporting tools, or any application requiring date range selection.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>The Calendar component accepts the following props:</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">variant:</Text> An optional string of CSS classes to apply custom styling
						variations to the calendar's appearance. Applied as <Text type="code"
							>fluid-calendar-variant</Text
						>.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">currentDate:</Text> An optional ISO 8601 formatted date string that specifies
						which month/year the calendar displays. Defaults to the current date.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">startDate:</Text> A bindable string property for the selected start date
						(ISO 8601 format). Set by the component when a date is selected.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">endDate:</Text> A bindable string property for the selected end date
						(ISO 8601 format). Set by the component when a date range is selected.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">hideRollingDays:</Text> An optional boolean that hides days from previous
						and next months in the calendar grid when set to <Text type="code">true</Text>. Defaults
						to
						<Text type="code">false</Text>.
					</Text>
				</li>
			</ul>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>Here is a default example of the Calendar component.</Text>
			<Container class="flex flex-col gap-4 rounded-lg border p-4">
				<Calendar />
			</Container>
			<Text>
				You can hide the days from the previous and next months by setting the
				<Text type="code">hideRollingDays</Text>
				prop to <Text type="code">true</Text>.
			</Text>
			<Container class="flex justify-center gap-4 rounded-lg border p-4">
				<Calendar
					currentDate={new Date(
						new Date(multiCalendarState.currentDate).setMonth(
							new Date(multiCalendarState.currentDate).getMonth() - 1
						)
					).toISOString()}
					bind:startDate={multiCalendarState.startDate}
					bind:endDate={multiCalendarState.endDate}
					hideRollingDays
				/>
				<Calendar
					bind:startDate={multiCalendarState.startDate}
					bind:endDate={multiCalendarState.endDate}
					hideRollingDays
				/>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import Calendar from 'fluid-ui-svelte/components/Calendar.svelte';
  import Text from 'fluid-ui-svelte/base/Text.svelte';

  let startDate = $state<string | undefined>();
  let endDate = $state<string | undefined>();
<\/script>

<Calendar bind:startDate bind:endDate />

{#if startDate && endDate}
  <Text>
    Selected range: {startDate} to {endDate}
  </Text>
{/if}`}
			/>
		</Container>
	</Container>
</Page>
