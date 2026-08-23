import { describe, expect, test } from 'vitest';
import { handlePinInput, handlePinPaste } from '$lib/utilities/pinInput';

describe('PinInput Utility', () => {
	test('handlePinPaste extracts and pads characters correctly', () => {
		expect(handlePinPaste('123456', 6)).toEqual(['1', '2', '3', '4', '5', '6']);
		expect(handlePinPaste('123', 6)).toEqual(['1', '2', '3', '', '', '']);
		expect(handlePinPaste('123456789', 6)).toEqual(['1', '2', '3', '4', '5', '6']);
		expect(handlePinPaste('  45 67  ', 4)).toEqual(['4', '5', '6', '7']);
	});

	test('handlePinInput sets digit and advances index', () => {
		const current = ['', '', '', ''];
		const result = handlePinInput(0, '5', 4, current);

		expect(result.newValues).toEqual(['5', '', '', '']);
		expect(result.nextIndex).toBe(1);
	});
});
