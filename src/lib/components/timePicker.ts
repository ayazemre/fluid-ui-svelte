export type TimeFormat = "12h" | "24h";

export type TimePickerMode = "hour" | "minute" | "second";

export type TimeComponents = {
  hour: string;
  minute: string;
  period?: "AM" | "PM";
  second?: string;
};

export function generateHours(format: TimeFormat): Array<string> {
  if (format === "12h") {
    return Array.from({ length: 12 }, (_, index) => {
      const value = index + 1;
      return value < 10 ? `0${value}` : `${value}`;
    });
  }

  return Array.from({ length: 24 }, (_, index) => {
    return index < 10 ? `0${index}` : `${index}`;
  });
}

export function generateMinutes(minuteInterval: number = 5): Array<string> {
  const validInterval = Math.max(1, Math.min(60, minuteInterval));
  const count = Math.floor(60 / validInterval);

  return Array.from({ length: count }, (_, index) => {
    const value = index * validInterval;
    return value < 10 ? `0${value}` : `${value}`;
  });
}

export function generateSeconds(secondInterval: number = 5): Array<string> {
  const validInterval = Math.max(1, Math.min(60, secondInterval));
  const count = Math.floor(60 / validInterval);

  return Array.from({ length: count }, (_, index) => {
    const value = index * validInterval;
    return value < 10 ? `0${value}` : `${value}`;
  });
}

export function parseTimeString(timeString: string, format: TimeFormat = "24h"): TimeComponents {
  if (!timeString || typeof timeString !== "string") {
    return {
      hour: format === "12h" ? "12" : "00",
      minute: "00",
      period: format === "12h" ? "AM" : undefined,
      second: "00",
    };
  }

  const trimmedTime = timeString.trim();
  const isTwelveHourPeriod = trimmedTime.toUpperCase().includes("PM") ? "PM" : trimmedTime.toUpperCase().includes("AM") ? "AM" : undefined;

  const rawNumbers = trimmedTime.replace(/[^\d:]/g, "");
  const timeSegments = rawNumbers.split(":");

  const rawHour = timeSegments[0] ?? "00";
  const rawMinute = timeSegments[1] ?? "00";
  const rawSecond = timeSegments[2] ?? "00";

  const normalizedHour = rawHour.padStart(2, "0");
  const normalizedMinute = rawMinute.padStart(2, "0");
  const normalizedSecond = rawSecond.padStart(2, "0");

  return {
    hour: normalizedHour,
    minute: normalizedMinute,
    period: format === "12h" ? (isTwelveHourPeriod ?? "AM") : undefined,
    second: normalizedSecond,
  };
}

export function formatTimeString(
  hour: string,
  minute: string = "00",
  period?: "AM" | "PM",
  second: string = "00",
  mode: TimePickerMode = "minute",
): string {
  let baseTime = hour;

  if (mode === "minute") {
    baseTime = `${hour}:${minute}`;
  } else if (mode === "second") {
    baseTime = `${hour}:${minute}:${second}`;
  }

  return period ? `${baseTime} ${period}` : baseTime;
}

export function getTimePickerCellStyles(isSelected: boolean): Array<string> {
  if (isSelected) {
    return ["fluid-timepicker-cell-selected", "bg-primary-600", "text-white", "font-semibold", "rounded-md"];
  }

  return ["fluid-timepicker-cell", "text-neutral-700", "dark:text-neutral-200", "hover:bg-neutral-100", "dark:hover:bg-neutral-800", "rounded-md"];
}
