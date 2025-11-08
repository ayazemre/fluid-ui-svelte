export function mergeClasses(classA: string, classB: string) {
	return [...new Set([...classA.split(' '), ...classB.split(' ')])].join(' ').trim();
}
