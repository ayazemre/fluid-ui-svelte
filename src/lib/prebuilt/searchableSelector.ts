export type SearchableSelectorItem = {
  avatarImage?: string;
  avatarText?: string;
  label: string;
  value: string;
};

export function getSearchableSelectorInitials(label: string, avatarText?: string): string {
  if (avatarText !== undefined && avatarText.trim() !== "") {
    return avatarText.trim().slice(0, 2).toUpperCase();
  }
  const words = label
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  if (words.length === 0) {
    return "?";
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function getSelectedSearchableSelectorItem(
  items: Array<SearchableSelectorItem>,
  selectedValue: string | undefined,
): SearchableSelectorItem | undefined {
  if (selectedValue === undefined || selectedValue === "") {
    return undefined;
  }
  return items.find((item) => item.value === selectedValue);
}

export function filterSearchableSelectorItems(items: Array<SearchableSelectorItem>, searchQuery: string): Array<SearchableSelectorItem> {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (normalizedQuery === "") {
    return items;
  }
  return items.filter((item) => {
    return (
      item.label.toLowerCase().includes(normalizedQuery) ||
      item.value.toLowerCase().includes(normalizedQuery) ||
      (item.avatarText !== undefined && item.avatarText.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function getSearchableSelectorAvatarBackground(label: string): string {
  let hash = 0;
  for (let index = 0; index < label.length; index++) {
    hash = label.charCodeAt(index) + ((hash << 5) - hash);
  }
  const colors = [
    "fluid-searchable-selector-avatar-color-0",
    "fluid-searchable-selector-avatar-color-1",
    "fluid-searchable-selector-avatar-color-2",
    "fluid-searchable-selector-avatar-color-3",
    "fluid-searchable-selector-avatar-color-4",
    "fluid-searchable-selector-avatar-color-5",
    "fluid-searchable-selector-avatar-color-6",
    "fluid-searchable-selector-avatar-color-7",
  ];
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}
