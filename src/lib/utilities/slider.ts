export function calculateSliderPercentage(value: number, min: number, max: number): number {
	if (max <= min) return 0;
	const clampedValue = Math.min(max, Math.max(min, value));
	return ((clampedValue - min) / (max - min)) * 100;
}

export function calculateSliderValue(
	clientX: number,
	trackRect: { left: number; width: number },
	min: number,
	max: number,
	step: number
): number {
	if (trackRect.width <= 0 || max <= min) return min;

	const relativeX = clientX - trackRect.left;
	const percentage = Math.min(1, Math.max(0, relativeX / trackRect.width));
	const rawValue = min + percentage * (max - min);

	if (step <= 0) return rawValue;

	const steppedValue = Math.round((rawValue - min) / step) * step + min;
	// Handle float rounding issues (e.g. 0.1 + 0.2)
	const precision = step.toString().split('.')[1]?.length ?? 0;
	const roundedValue = Number(steppedValue.toFixed(precision));

	return Math.min(max, Math.max(min, roundedValue));
}
