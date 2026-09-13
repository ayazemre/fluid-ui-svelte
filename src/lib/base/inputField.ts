export function applyCharacterFilter(allowedCharacters: Array<string>, value: string): string {
  return value
    .split("")
    .filter((character) => allowedCharacters.includes(character))
    .join("");
}
