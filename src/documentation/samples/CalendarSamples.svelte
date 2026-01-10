<script lang="ts">
	import { Calendar, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Button } from '$lib/base/index.js';
	import { codeBlockContents } from './codeBlockContents.js';

	// Example 1 State
	let date1 = $state(new Date().toISOString());
	const changeMonth1 = (inc: number) => {
		const d = new Date(date1);
		d.setMonth(d.getMonth() + inc);
		date1 = d.toISOString();
	};

	// Example 2 State
	const multiCalendarState = $state({
		currentDate: new Date().toISOString(),
		startDate: '',
		endDate: ''
	});

	const changeMonthMulti = (inc: number) => {
		const d = new Date(multiCalendarState.currentDate);
		d.setMonth(d.getMonth() + inc);
		multiCalendarState.currentDate = d.toISOString();
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
				<Button class="fluid-button-secondary" onclick={async () => changeMonth1(-1)}>Prev</Button>
				<Button class="fluid-button-secondary" onclick={async () => changeMonth1(1)}>Next</Button>
			</Container>
			<Container class="max-w-sm rounded border p-4 dark:border-neutral-800">
				<Calendar currentDate={date1} componentId="calendar-single" />
			</Container>
		</Container>
		<CodeBlock code={codeBlockContents.calendarSingle} language="svelte" />
	</Container>

	<!-- 2. Multi Calendar -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Multi Calendar</Text>
		<Text class="text-neutral-500">Connect multiple calendars to the same state variables.</Text>
		<Container class="rounded-xl border p-6 dark:border-neutral-800">
			<Container class="mb-4 flex gap-2">
				<Button class="fluid-button-secondary" onclick={async () => changeMonthMulti(-1)}
					>Prev</Button
				>
				<Button class="fluid-button-secondary" onclick={async () => changeMonthMulti(1)}
					>Next</Button
				>
			</Container>
			<Container class="flex flex-wrap gap-8">
				<Container class="max-w-sm rounded border p-4 dark:border-neutral-800">
					<Calendar
						currentDate={multiCalendarState.currentDate}
						bind:startDate={multiCalendarState.startDate}
						bind:endDate={multiCalendarState.endDate}
						componentId="calendar-multi-1"
					/>
				</Container>
				<Container class="max-w-sm rounded border p-4 dark:border-neutral-800">
					<Calendar
						currentDate={new Date(
							new Date(multiCalendarState.currentDate).setMonth(
								new Date(multiCalendarState.currentDate).getMonth() + 1
							)
						).toISOString()}
						bind:startDate={multiCalendarState.startDate}
						bind:endDate={multiCalendarState.endDate}
						componentId="calendar-multi-2"
					/>
				</Container>
			</Container>
		</Container>
		<CodeBlock code={codeBlockContents.calendarMulti} language="svelte" />
	</Container>
</Container>
