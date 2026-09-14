export type DateRange = {
  endDate?: string;
  startDate?: string;
};

export function applyDate(currentDates: DateRange, selectedDateString: string): DateRange {
  if (currentDates.endDate && currentDates.endDate === selectedDateString) {
    return {
      endDate: undefined,
      startDate: currentDates.startDate,
    };
  }

  if (currentDates.startDate && currentDates.startDate === selectedDateString) {
    return {
      endDate: currentDates.endDate,
      startDate: undefined,
    };
  }

  if (!currentDates.startDate) {
    return {
      endDate: currentDates.endDate,
      startDate: selectedDateString,
    };
  }

  if (!currentDates.endDate) {
    const startComparison = compareIsoDateStrings(selectedDateString, currentDates.startDate);

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

  const rearrangementComparison = compareIsoDateStrings(selectedDateString, currentDates.startDate);

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
  const currentDate = parseIsoDateStringToDate(dateString);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const startDayOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const calendarDays: Array<string> = [];

  for (let offset = startDayOffset; offset > 0; offset--) {
    const previousDate = new Date(firstDayOfMonth);
    previousDate.setDate(firstDayOfMonth.getDate() - offset);
    calendarDays.push(formatDateToIsoString(previousDate));
  }

  for (let currentDayNumber = 1; currentDayNumber <= daysInCurrentMonth; currentDayNumber++) {
    const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDayNumber);
    calendarDays.push(formatDateToIsoString(currentDayDate));
  }

  const totalGridCells = startDayOffset + daysInCurrentMonth > 35 ? 42 : 35;
  const remainingCellCount = totalGridCells - calendarDays.length;
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInCurrentMonth);

  for (let nextDayNumber = 1; nextDayNumber <= remainingCellCount; nextDayNumber++) {
    const nextDate = new Date(lastDayOfMonth);
    nextDate.setDate(lastDayOfMonth.getDate() + nextDayNumber);
    calendarDays.push(formatDateToIsoString(nextDate));
  }

  return calendarDays;
}

export function isBetweenDateRange(selectedDateString: string, startDateString?: string, endDateString?: string): boolean {
  if (!startDateString || !endDateString) {
    return false;
  }

  const selectedDate = parseIsoDateStringToDate(selectedDateString);
  const startDate = parseIsoDateStringToDate(startDateString);
  const endDate = parseIsoDateStringToDate(endDateString);

  const startEndComparison = compareDates(startDate, endDate);
  const earlierDate = startEndComparison < 0 ? startDate : endDate;
  const laterDate = startEndComparison < 0 ? endDate : startDate;

  return compareDates(selectedDate, earlierDate) > 0 && compareDates(selectedDate, laterDate) < 0;
}

export function generateCalendarCellStyles(
  currentDateString: string,
  cellDateString: string,
  startDateString?: string,
  endDateString?: string,
  hideRollingDays: boolean = false,
): Array<string> {
  const styles: Array<string> = ["fluid-calendar-cell"];
  const currentDate = parseIsoDateStringToDate(currentDateString);
  const cellDate = parseIsoDateStringToDate(cellDateString);

  if (currentDate.getMonth() !== cellDate.getMonth()) {
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

export function getCurrentIsoDateString(): string {
  return formatDateToIsoString(new Date());
}

export function addMonthsToIsoDateString(dateString: string, monthsToAdd: number): string {
  const parsedDate = parseIsoDateStringToDate(dateString);
  const resultDate = new Date(parsedDate);
  resultDate.setMonth(parsedDate.getMonth() + monthsToAdd);
  return formatDateToIsoString(resultDate);
}

export function getMonthNameFromIsoDateString(dateString: string): string {
  const parsedDate = parseIsoDateStringToDate(dateString);
  return parsedDate.toLocaleString("default", { month: "long" });
}

export function getDayNumberFromIsoDateString(dateString: string): number {
  const parsedDate = parseIsoDateStringToDate(dateString);
  return parsedDate.getDate();
}

function parseIsoDateStringToDate(isoDateString: string): Date {
  const [yearString, monthString, dayString] = isoDateString.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  return new Date(year, month - 1, day);
}

function formatDateToIsoString(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function compareIsoDateStrings(firstDateString: string, secondDateString: string): number {
  const firstDate = parseIsoDateStringToDate(firstDateString);
  const secondDate = parseIsoDateStringToDate(secondDateString);
  return compareDates(firstDate, secondDate);
}

function compareDates(firstDate: Date, secondDate: Date): number {
  const firstTime = firstDate.getTime();
  const secondTime = secondDate.getTime();
  if (firstTime < secondTime) {
    return -1;
  }
  if (firstTime > secondTime) {
    return 1;
  }
  return 0;
}
