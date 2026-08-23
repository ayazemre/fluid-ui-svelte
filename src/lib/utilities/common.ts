export function mergeClasses(...classes: (string | undefined | false | null)[]) {
	const classList = classes
		.filter(Boolean)
		.flatMap((className) => (className as string).split(' '))
		.filter((className) => className.trim().length > 0);
	return [...new Set(classList)].join(' ').trim();
}
