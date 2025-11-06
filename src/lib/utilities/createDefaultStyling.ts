export function createDefaultStyling(
	className: string,
	defaultStyle: string,
	overrideDefaultStyling: boolean
) {
	return [...className.split(' '), overrideDefaultStyling ? '' : defaultStyle].join(' ').trim();
}
