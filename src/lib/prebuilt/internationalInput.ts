export type CountryData = {
  currency: string;
  dialCode: string;
  examplePhone: string;
  flag: string;
  name: string;
  timezones: Array<string>;
};

export type CountryDataMap = Record<string, CountryData>;

export type InternationalInputMode = "phone" | "country" | "timezone" | "currency" | "dialCode";

export function getCountryData(countries: CountryDataMap, isoCode: string): CountryData | undefined {
  return countries[isoCode.toUpperCase()];
}

export function filterCountryEntries(countries: CountryDataMap, searchQuery: string): Array<{ data: CountryData; isoCode: string }> {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const allEntries = Object.entries(countries).map(([isoCode, data]) => ({
    data,
    isoCode,
  }));

  if (!normalizedQuery) {
    return allEntries;
  }

  return allEntries.filter(({ data, isoCode }) => {
    return (
      isoCode.toLowerCase().includes(normalizedQuery) ||
      data.name.toLowerCase().includes(normalizedQuery) ||
      data.dialCode.includes(normalizedQuery) ||
      data.currency.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getPlaceholderForMode(mode: InternationalInputMode, country: CountryData | undefined, customPlaceholder?: string): string {
  if (customPlaceholder) {
    return customPlaceholder;
  }

  if (mode === "currency") {
    return "0.00";
  }

  if (!country) {
    return "";
  }

  switch (mode) {
    case "phone":
      return country.examplePhone;
    case "country":
      return country.name;
    case "timezone":
      return country.timezones[0] ?? "";
    case "dialCode":
      return country.dialCode;
    default:
      return country.examplePhone;
  }
}

export function getTriggerDisplay(mode: InternationalInputMode, isoCode: string, country: CountryData | undefined): { flag: string; label: string } {
  if (!country) {
    return { flag: "", label: isoCode };
  }

  switch (mode) {
    case "phone":
    case "dialCode":
      return { flag: country.flag, label: country.dialCode };
    case "currency":
      return { flag: country.flag, label: country.currency };
    case "timezone":
      return { flag: country.flag, label: country.timezones[0] ?? isoCode };
    case "country":
    default:
      return { flag: country.flag, label: country.name };
  }
}
