export function applyDate(
	currentDates: { startDate?: string; endDate?: string },
	selectedDate: string
) {
	// If selected already, second click action is to remove selection.
	if (currentDates.endDate && currentDates.endDate === selectedDate) {
		currentDates.endDate = undefined;
		return currentDates;
	}

	// If selected already, second click action is to remove selection.
	if (currentDates.startDate && currentDates.startDate === selectedDate) {
		currentDates.startDate = undefined;
		return currentDates;
	}

	// Nothing is selected, set start date.
	if (!currentDates.startDate) {
		currentDates.startDate = selectedDate;
	}
	// If start date is already there, apply range by setting end date.
	else if (!currentDates.endDate) {
		// If newly selected date earlier swap with start date..
		if (selectedDate < currentDates.startDate) {
			currentDates.endDate = currentDates.startDate;
			currentDates.startDate = selectedDate;
		} else {
			currentDates.endDate = selectedDate;
		}
	}
	// If both exists, rearrange the range based on the selected date.
	else {
		// If newly selected date is smaller than start date, reset start date to selected date.
		if (selectedDate < currentDates.startDate) {
			currentDates.startDate = selectedDate;
		}
		// If newly selected date is bigger than start date, extend the range.
		else {
			currentDates.endDate = selectedDate;
		}
	}
	return currentDates;
}

export function generateDaysOfTheMonthFromDate(date: string) {
	const dateInstance = new Date(date);

	// Get year and month for active date.
	const year = dateInstance.getFullYear();
	const month = dateInstance.getMonth();

	// Get first day, last day and total number of days of active month.
	const firstDayOfMonth = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	// Get day of the week for first day of the month and remove 1 for 0 indexed array.
	let startDayOfWeek = firstDayOfMonth.getDay() - 1;

	// If day of the week is Sunday index will be -1 because Sunday's index is 0.
	// Our array has 6 as Sunday so we "roll over".
	if (startDayOfWeek === -1) {
		startDayOfWeek = 6; // Sunday
	}

	const days: Array<string> = [];

	// Get last day of the previous month.
	// Date constructors 'date' parameter starts from 1 so if we give 0 we go last day of previous month.
	const prevMonthLastDay = new Date(year, month, 0).getDate();
	// Go to previous month's first day.
	const prevMonth = new Date(year, month - 1, 1);
	// Add rolling over days of the last month to current array which will be used to render the current month's grid.
	// This is reversed because it adds rollover days by subtracting it one by one.
	// If start day of the week is Wednesday then it is equal to 4, basically adding 28th, 29th, 30th and 31st to first row as rolling over days.
	for (let i = startDayOfWeek; i > 0; i--) {
		const day = prevMonthLastDay - i + 1;
		days.push(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day).toISOString());
	}

	// Adding days of the current month on top of rolled over days from last month.
	for (let i = 1; i <= daysInMonth; i++) {
		days.push(new Date(year, month, i).toISOString());
	}

	// Adding rolling back days of the next month to current grid if month is not ending at Sunday.
	const remainingDays = (startDayOfWeek + daysInMonth > 35 ? 42 : 35) - days.length; // 42 cells for a 6x7 grid
	const nextMonth = new Date(year, month + 1, 1);
	for (let i = 1; i <= remainingDays; i++) {
		days.push(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i).toISOString());
	}

	return days;
}

export function isBetweenDateRange(selectedDate: string, startDate?: string, endDate?: string) {
	if (!startDate || !endDate) {
		return false;
	}

	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);
	const selectedDateObj = new Date(selectedDate);

	// Normalize all dates to midnight to compare only the date part.
	const start = new Date(
		startDateObj.getFullYear(),
		startDateObj.getMonth(),
		startDateObj.getDate()
	);
	const end = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
	const current = new Date(
		selectedDateObj.getFullYear(),
		selectedDateObj.getMonth(),
		selectedDateObj.getDate()
	);

	// Determine the actual earlier and later dates to handle incorrect order.
	const earlierDate = start < end ? start : end;
	const laterDate = start < end ? end : start;

	// Perform the check to see if the current date is within the range .
	return current > earlierDate && current < laterDate;
}

export function generateCalendarCellStyles(
	currentDate: string,
	cellDate: string,
	startDate?: string,
	endDate?: string,
	hideRollingDays: boolean = false
) {
	const styles = ['fluid-calendar-cell'];

	if (new Date(currentDate).getMonth() !== new Date(cellDate).getMonth()) {
		styles.push('fluid-calendar-cell-rolling-day');
		if (hideRollingDays) {
			styles.push('invisible');
		}
	}

	if (startDate === cellDate || endDate === cellDate) {
		styles.push('fluid-calendar-cell-selected');
	}

	if (isBetweenDateRange(cellDate, startDate, endDate)) {
		styles.push('fluid-calendar-cell-in-range');
	}

	return styles.join(' ');
}
