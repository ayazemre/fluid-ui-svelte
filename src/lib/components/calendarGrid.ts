export type DateRange = {
  endDate?: string;
  startDate?: string;
};

export function applyDate(currentDates: DateRange, selectedDateString: string): DateRange {
  // If end date is clicked again, remove end date selection
  if (currentDates.endDate && currentDates.endDate === selectedDateString) {
    return {
      endDate: undefined,
      startDate: currentDates.startDate,
    };
  }

  // If start date is clicked again, remove start date selection
  if (currentDates.startDate && currentDates.startDate === selectedDateString) {
    return {
      endDate: currentDates.endDate,
      startDate: undefined,
    };
  }

  // Nothing is selected, set start date
  if (!currentDates.startDate) {
    return {
      endDate: currentDates.endDate,
      startDate: selectedDateString,
    };
  }

  // If start date exists but no end date, complete the range
  if (!currentDates.endDate) {
    const startComparison = Temporal.PlainDate.compare(Temporal.PlainDate.from(selectedDateString), Temporal.PlainDate.from(currentDates.startDate));

    if (startComparison < 0) {
      return {
        endDate: currentDates.startDate,
        startDate: selectedDateString,
      };
    }

    return {
      endDate: selectedDateString,
      startDate: currentDates.startDate,
    };
  }

  // If both dates exist, rearrange range based on newly selected date
  const rearrangementComparison = Temporal.PlainDate.compare(
    Temporal.PlainDate.from(selectedDateString),
    Temporal.PlainDate.from(currentDates.startDate),
  );

  if (rearrangementComparison < 0) {
    return {
      endDate: currentDates.endDate,
      startDate: selectedDateString,
    };
  }

  return {
    endDate: selectedDateString,
    startDate: currentDates.startDate,
  };
}

export function generateDaysOfTheMonthFromDate(dateString: string): Array<string> {
  const currentDate = Temporal.PlainDate.from(dateString);
  const firstDayOfMonth = currentDate.with({ day: 1 });

  // Temporal.PlainDate dayOfWeek: Monday is 1, Sunday is 7. Offset relative to Monday:
  const startDayOffset = firstDayOfMonth.dayOfWeek - 1;
  const daysInCurrentMonth = currentDate.daysInMonth;
  const calendarDays: Array<string> = [];

  // Add rollover days from previous month
  for (let offset = startDayOffset; offset > 0; offset--) {
    calendarDays.push(firstDayOfMonth.subtract({ days: offset }).toString());
  }

  // Add days of the current month
  for (let currentDayNumber = 1; currentDayNumber <= daysInCurrentMonth; currentDayNumber++) {
    calendarDays.push(currentDate.with({ day: currentDayNumber }).toString());
  }

  // Add rollover days from next month to complete standard grid (35 or 42 cells)
  const totalGridCells = startDayOffset + daysInCurrentMonth > 35 ? 42 : 35;
  const remainingCellCount = totalGridCells - calendarDays.length;
  const lastDayOfMonth = currentDate.with({ day: daysInCurrentMonth });

  for (let nextDayNumber = 1; nextDayNumber <= remainingCellCount; nextDayNumber++) {
    calendarDays.push(lastDayOfMonth.add({ days: nextDayNumber }).toString());
  }

  return calendarDays;
}

export function isBetweenDateRange(selectedDateString: string, startDateString?: string, endDateString?: string): boolean {
  if (!startDateString || !endDateString) {
    return false;
  }

  const selectedDate = Temporal.PlainDate.from(selectedDateString);
  const startDate = Temporal.PlainDate.from(startDateString);
  const endDate = Temporal.PlainDate.from(endDateString);

  const startEndComparison = Temporal.PlainDate.compare(startDate, endDate);
  const earlierDate = startEndComparison < 0 ? startDate : endDate;
  const laterDate = startEndComparison < 0 ? endDate : startDate;

  return Temporal.PlainDate.compare(selectedDate, earlierDate) > 0 && Temporal.PlainDate.compare(selectedDate, laterDate) < 0;
}

export function generateCalendarCellStyles(
  currentDateString: string,
  cellDateString: string,
  startDateString?: string,
  endDateString?: string,
  hideRollingDays: boolean = false,
): Array<string> {
  const styles: Array<string> = ["fluid-calendar-cell"];
  const currentDate = Temporal.PlainDate.from(currentDateString);
  const cellDate = Temporal.PlainDate.from(cellDateString);

  if (currentDate.month !== cellDate.month) {
    styles.push("fluid-calendar-cell-rolling-day");
    if (hideRollingDays) {
      styles.push("invisible");
    }
  }

  if (startDateString === cellDateString || endDateString === cellDateString) {
    styles.push("fluid-calendar-cell-selected");
  }

  if (isBetweenDateRange(cellDateString, startDateString, endDateString)) {
    styles.push("fluid-calendar-cell-in-range");
  }

  return styles;
}
