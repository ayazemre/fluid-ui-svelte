<script lang="ts">
	import { Container, Button, Text } from '$lib/base';
	import {
		applyDate,
		generateCalendarCellStyles,
		generateDaysOfTheMonthFromDate
	} from '$lib/utilities/datePicker';
	import { mergeClasses } from '$lib/utilities/common';

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

<Container id={componentId} class={mergeClasses(variant, 'fluid-calendar-wrapper flex flex-col')}>
	<Container class={mergeClasses(variant, 'fluid-calendar-header flex w-full ')}>
		<Text>{new Date(currentDate).toLocaleString('default', { month: 'long' })}</Text>
	</Container>
	<Container
		class={mergeClasses(variant, 'fluid-calendar-body grid grid-cols-7 justify-items-center')}
	>
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
