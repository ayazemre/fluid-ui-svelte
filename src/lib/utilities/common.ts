export function mergeClasses(firstClassString: string, secondClassString: string): string {
  return [...new Set([...firstClassString.split(" "), ...secondClassString.split(" ")])].join(" ").trim();
}
