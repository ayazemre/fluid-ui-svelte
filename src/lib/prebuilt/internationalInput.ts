export type CountryData = {
  currency: string;
  dialCode: string;
  examplePhone: string;
  flag: string;
  name: string;
  timezones: Array<string>;
};

export type InternationalInputMode = "phone" | "country" | "timezone" | "currency" | "dialCode";

export const COUNTRY_DATA_MAP: Record<string, CountryData> = {
  AE: {
    currency: "AED (د.إ)",
    dialCode: "+971",
    examplePhone: "50 123 4567",
    flag: "🇦🇪",
    name: "United Arab Emirates",
    timezones: ["Asia/Dubai"],
  },
  AU: {
    currency: "AUD ($)",
    dialCode: "+61",
    examplePhone: "412 345 678",
    flag: "🇦🇺",
    name: "Australia",
    timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Perth"],
  },
  BR: {
    currency: "BRL (R$)",
    dialCode: "+55",
    examplePhone: "(11) 98765-4321",
    flag: "🇧🇷",
    name: "Brazil",
    timezones: ["America/Sao_Paulo"],
  },
  CA: {
    currency: "CAD ($)",
    dialCode: "+1",
    examplePhone: "(416) 555-0199",
    flag: "🇨🇦",
    name: "Canada",
    timezones: ["America/Toronto", "America/Vancouver"],
  },
  CH: {
    currency: "CHF (Fr.)",
    dialCode: "+41",
    examplePhone: "78 123 45 67",
    flag: "🇨🇭",
    name: "Switzerland",
    timezones: ["Europe/Zurich"],
  },
  CN: {
    currency: "CNY (¥)",
    dialCode: "+86",
    examplePhone: "138 0013 8000",
    flag: "🇨🇳",
    name: "China",
    timezones: ["Asia/Shanghai"],
  },
  DE: {
    currency: "EUR (€)",
    dialCode: "+49",
    examplePhone: "151 23456789",
    flag: "🇩🇪",
    name: "Germany",
    timezones: ["Europe/Berlin"],
  },
  ES: {
    currency: "EUR (€)",
    dialCode: "+34",
    examplePhone: "612 34 56 78",
    flag: "🇪🇸",
    name: "Spain",
    timezones: ["Europe/Madrid"],
  },
  FR: {
    currency: "EUR (€)",
    dialCode: "+33",
    examplePhone: "6 12 34 56 78",
    flag: "🇫🇷",
    name: "France",
    timezones: ["Europe/Paris"],
  },
  GB: {
    currency: "GBP (£)",
    dialCode: "+44",
    examplePhone: "7911 123456",
    flag: "🇬🇧",
    name: "United Kingdom",
    timezones: ["Europe/London"],
  },
  IN: {
    currency: "INR (₹)",
    dialCode: "+91",
    examplePhone: "98765 43210",
    flag: "🇮🇳",
    name: "India",
    timezones: ["Asia/Kolkata"],
  },
  IT: {
    currency: "EUR (€)",
    dialCode: "+39",
    examplePhone: "312 345 6789",
    flag: "🇮🇹",
    name: "Italy",
    timezones: ["Europe/Rome"],
  },
  JP: {
    currency: "JPY (¥)",
    dialCode: "+81",
    examplePhone: "90-1234-5678",
    flag: "🇯🇵",
    name: "Japan",
    timezones: ["Asia/Tokyo"],
  },
  KR: {
    currency: "KRW (₩)",
    dialCode: "+82",
    examplePhone: "10-1234-5678",
    flag: "🇰🇷",
    name: "South Korea",
    timezones: ["Asia/Seoul"],
  },
  MX: {
    currency: "MXN ($)",
    dialCode: "+52",
    examplePhone: "55 1234 5678",
    flag: "🇲🇽",
    name: "Mexico",
    timezones: ["America/Mexico_City"],
  },
  NL: {
    currency: "EUR (€)",
    dialCode: "+31",
    examplePhone: "6 12345678",
    flag: "🇳🇱",
    name: "Netherlands",
    timezones: ["Europe/Amsterdam"],
  },
  SA: {
    currency: "SAR (﷼)",
    dialCode: "+966",
    examplePhone: "50 123 4567",
    flag: "🇸🇦",
    name: "Saudi Arabia",
    timezones: ["Asia/Riyadh"],
  },
  SE: {
    currency: "SEK (kr)",
    dialCode: "+46",
    examplePhone: "70 123 45 67",
    flag: "🇸🇪",
    name: "Sweden",
    timezones: ["Europe/Stockholm"],
  },
  SG: {
    currency: "SGD ($)",
    dialCode: "+65",
    examplePhone: "8123 4567",
    flag: "🇸🇬",
    name: "Singapore",
    timezones: ["Asia/Singapore"],
  },
  TR: {
    currency: "TRY (₺)",
    dialCode: "+90",
    examplePhone: "532 123 45 67",
    flag: "🇹🇷",
    name: "Turkey",
    timezones: ["Europe/Istanbul"],
  },
  US: {
    currency: "USD ($)",
    dialCode: "+1",
    examplePhone: "(555) 123-4567",
    flag: "🇺🇸",
    name: "United States",
    timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"],
  },
};

export function getCountryData(isoCode: string): CountryData {
  const upperCode = isoCode.toUpperCase();
  return COUNTRY_DATA_MAP[upperCode] ?? COUNTRY_DATA_MAP["US"];
}

export function filterCountryEntries(searchQuery: string): Array<{ data: CountryData; isoCode: string }> {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const allEntries = Object.entries(COUNTRY_DATA_MAP).map(([isoCode, data]) => ({
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

export function getPlaceholderForMode(mode: InternationalInputMode, country: CountryData, customPlaceholder?: string): string {
  if (customPlaceholder) {
    return customPlaceholder;
  }

  switch (mode) {
    case "phone":
      return country.examplePhone;
    case "country":
      return country.name;
    case "timezone":
      return country.timezones[0] ?? "UTC";
    case "currency":
      return "0.00";
    case "dialCode":
      return country.dialCode;
    default:
      return country.examplePhone;
  }
}

export function getTriggerDisplay(mode: InternationalInputMode, isoCode: string, country: CountryData): { flag: string; label: string } {
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
