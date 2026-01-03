<script lang="ts">
	import { Calendar, Page, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Table, Button } from '$lib/base/index.js';
	import { codeBlockContents } from '$lib/utilities/codeBlockContents.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'componentId',
			type: 'string',
			default: 'undefined',
			description: 'The unique identifier for the component wrapper.'
		},
		{
			prop: 'variant',
			type: 'string',
			default: "''",
			description: 'Custom variant class for theming.'
		},
		{
			prop: 'currentDate',
			type: 'string',
			default: 'new Date().toISOString()',
			description:
				'ISO 8601 formatted date string that determines the displayed month. Supports $bindable.'
		},
		{
			prop: 'startDate',
			type: 'string',
			default: 'undefined',
			description: 'Selected start date (ISO 8601). Supports $bindable.'
		},
		{
			prop: 'endDate',
			type: 'string',
			default: 'undefined',
			description: 'Selected end date (ISO 8601). Supports $bindable.'
		},
		{
			prop: 'weekDays',
			type: 'string[]',
			default: "['Mon', 'Tue', ...]",
			description: 'Array of week day names to display in the header.'
		},
		{
			prop: 'hideRollingDays',
			type: 'boolean',
			default: 'false',
			description: 'Whether to hide days from previous/next months.'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

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

<Page
	title="Fluid UI - Calendar"
	description="A highly flexible, headless-inspired calendar component. It renders a month view based on a provided date, giving you full control over navigation and layout."
>
	<Container class="flex flex-col gap-12">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Calendar</Text>
			<Text>
				The Calendar component is designed to be a building block. It renders a single month view
				based on the <Text type="code">currentDate</Text> prop. It does not include built-in navigation
				buttons, allowing you to build anything from a simple date picker to a complex multi-month booking
				interface.
			</Text>
		</Container>

		<Container class="hidden flex-col gap-4 overflow-x-auto md:flex">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Table
				tableHeadItems={headers}
				tableRowItems={tableRows}
				tableFooterItems={[]}
				class="w-full text-left"
			>
				{#snippet headTemplate(item: string)}
					<Text class="p-2 font-bold">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item: any)}
					<Container overrideDefaultStyling={true} class="p-2">
						{#if item.col === 'prop'}
							<Text type="code" class="font-bold text-primary-600">{item.value}</Text>
						{:else if item.col === 'type'}
							<Text type="code" class="text-sm text-neutral-600 dark:text-neutral-400"
								>{item.value}</Text
							>
						{:else if item.col === 'default'}
							<Text type="code" class="text-sm text-neutral-500">{item.value}</Text>
						{:else}
							<Text class="text-sm">{item.value}</Text>
						{/if}
					</Container>
				{/snippet}

				{#snippet footerTemplate()}
					<Container overrideDefaultStyling={true} />
				{/snippet}
			</Table>
		</Container>

		<Container class="flex flex-col gap-10">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<!-- 1. Single Month -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">1. Single Month with External Navigation</Text>
				<Text class="text-neutral-500">
					Control the displayed month by updating the <Text type="code">currentDate</Text> prop from outside.
				</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Container class="mb-4 flex gap-2">
						<Button class="fluid-button-secondary" onclick={async () => changeMonth1(-1)}
							>Prev</Button
						>
						<Button class="fluid-button-secondary" onclick={async () => changeMonth1(1)}
							>Next</Button
						>
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
				<Text class="text-neutral-500">
					Connect multiple calendars to the same state variables.
				</Text>
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
	</Container>
</Page>
