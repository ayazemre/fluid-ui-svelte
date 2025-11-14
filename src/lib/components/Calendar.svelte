<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Button from '../base/Button.svelte';
	import Text from '../base/Text.svelte';
	import {
		applyDate,
		generateCalendarCellStyles,
		generateDaysOfTheMonthFromDate
	} from '../utilities/calendar.js';
	import { mergeClasses } from '../utilities/mergeClasses.js';

	let {
		variant = '',
		currentDate = new Date().toISOString(),
		startDate = $bindable(),
		endDate = $bindable(),
		hideRollingDays = false
	}: {
		variant?: string;
		currentDate?: string;
		startDate?: string;
		endDate?: string;
		hideRollingDays?: boolean;
	} = $props();

	const componentState = $state({
		weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		calendarDays: generateDaysOfTheMonthFromDate(new Date().toISOString())
	});

	function dateSelectionHandler(selectedDate: string) {
		const result = applyDate({ startDate, endDate: endDate }, selectedDate);
		startDate = result.startDate;
		endDate = result.endDate;
	}

	$effect(() => {
		componentState.calendarDays = generateDaysOfTheMonthFromDate(currentDate);
	});
</script>

<Container class={mergeClasses('fluid-calendar-wrapper', variant)}>
	<Container class={mergeClasses('fluid-calendar-header', variant)}>
		<Text>{new Date(currentDate).toLocaleString('default', { month: 'long' })}</Text>
	</Container>
	<Container class={mergeClasses('fluid-calendar-body', variant)}>
		{#each componentState.weekDays as day}
			<Text>{day}</Text>
		{/each}

		{#each componentState.calendarDays as cellDay}
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
