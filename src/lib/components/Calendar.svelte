<script lang="ts">
	import { Container, Button, Text } from '$lib/base/index.js';
	import {
		applyDate,
		generateCalendarCellStyles,
		generateDaysOfTheMonthFromDate
	} from '$lib/utilities/calendar.js';
	import { mergeClasses } from '$lib/utilities/common.js';

	let {
		variant = '',
		componentId,
		currentDate = new Date().toISOString(),
		startDate = $bindable(),
		endDate = $bindable(),
		weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		calendarDays = generateDaysOfTheMonthFromDate(new Date().toISOString()),
		hideRollingDays = false
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
		const result = applyDate({ startDate, endDate: endDate }, selectedDate);
		startDate = result.startDate;
		endDate = result.endDate;
	}

	$effect(() => {
		calendarDays = generateDaysOfTheMonthFromDate(currentDate);
	});
</script>

<Container id={componentId} class={mergeClasses('fluid-calendar-wrapper', variant)}>
	<Container class={mergeClasses('fluid-calendar-header', variant)}>
		<Text>{new Date(currentDate).toLocaleString('default', { month: 'long' })}</Text>
	</Container>
	<Container class={mergeClasses('fluid-calendar-body', variant)}>
		{#each weekDays as day}
			<Text>{day}</Text>
		{/each}

		{#each calendarDays as cellDay}
			<Button
				onclick={async () => dateSelectionHandler(cellDay)}
				class={mergeClasses(
					variant,
					generateCalendarCellStyles(currentDate, cellDay, startDate, endDate, hideRollingDays)
				)}
			>
				{new Date(cellDay).getDate()}
			</Button>
		{/each}
	</Container>
</Container>
