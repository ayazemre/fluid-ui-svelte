import { describe, expect, test } from 'vitest';
import { calculateContextMenuPosition } from '$lib/utilities/contextMenu';

describe('ContextMenu Utility', () => {
	test('calculateContextMenuPosition returns exact coordinates within bounds', () => {
		const pos = calculateContextMenuPosition(100, 150, 200, 100, 1024, 768);
		expect(pos).toEqual({ x: 100, y: 150 });
	});

	test('calculateContextMenuPosition clamps coordinates when overflowing right or bottom edge', () => {
		// Near right boundary (clientX = 950, width = 200, screen = 1000)
		const posRight = calculateContextMenuPosition(950, 100, 200, 100, 1000, 800);
		expect(posRight.x).toBe(792); // 1000 - 200 - 8

		// Near bottom boundary (clientY = 750, height = 100, screen = 800)
		const posBottom = calculateContextMenuPosition(100, 750, 200, 100, 1000, 800);
		expect(posBottom.y).toBe(692); // 800 - 100 - 8
	});
});
