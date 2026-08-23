import { describe, expect, test } from 'vitest';
import { calculateSliderPercentage, calculateSliderValue } from '$lib/utilities/slider';

describe('Slider Utility', () => {
	test('calculateSliderPercentage calculates correct percentage', () => {
		expect(calculateSliderPercentage(50, 0, 100)).toBe(50);
		expect(calculateSliderPercentage(0, 0, 100)).toBe(0);
		expect(calculateSliderPercentage(100, 0, 100)).toBe(100);
		expect(calculateSliderPercentage(150, 0, 100)).toBe(100);
		expect(calculateSliderPercentage(-50, 0, 100)).toBe(0);
		expect(calculateSliderPercentage(25, 0, 50)).toBe(50);
		expect(calculateSliderPercentage(10, 10, 10)).toBe(0);
	});

	test('calculateSliderValue calculates stepped value from client coordinates', () => {
		const trackRect = { left: 100, width: 200 };

		// Exactly at start (left: 100) -> min 0
		expect(calculateSliderValue(100, trackRect, 0, 100, 1)).toBe(0);

		// Exactly at end (left: 300) -> max 100
		expect(calculateSliderValue(300, trackRect, 0, 100, 1)).toBe(100);

		// Middle (left: 200) -> 50
		expect(calculateSliderValue(200, trackRect, 0, 100, 1)).toBe(50);

		// Stepping with float (0.5)
		expect(calculateSliderValue(200, trackRect, 0, 10, 0.5)).toBe(5);

		// Clamping out of bounds
		expect(calculateSliderValue(50, trackRect, 0, 100, 1)).toBe(0);
		expect(calculateSliderValue(400, trackRect, 0, 100, 1)).toBe(100);
	});
});
