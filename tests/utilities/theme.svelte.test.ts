import { describe, expect, test } from 'vitest';
import fluidUiCss from '../../src/fluidui.css?raw';
import {
	contrastRatio,
	formatOklch,
	generateRamp,
	oklchToHex,
	rampStops
} from '../../src/documentation/theme/color';
import { defaultTheme, presets } from '../../src/documentation/theme/presets';
import {
	buildTokens,
	buildRamps,
	themeToFluidCss,
	themeToCss,
	applyTheme,
	clearTheme,
	colorRoles,
	type Theme
} from '../../src/documentation/theme/theme';

describe('Theme System', () => {
	test('generateRamp produces 11 OKLCH stops', () => {
		const ramp = generateRamp('#3b82f6');
		expect(Object.keys(ramp)).toHaveLength(11);
		for (const stop of rampStops) {
			expect(ramp[stop]).toBeDefined();
			expect(ramp[stop].l).toBeGreaterThan(0);
			expect(ramp[stop].l).toBeLessThanOrEqual(1);
		}
		expect(oklchToHex(ramp[500])).toBe('#3b82f6');
	});

	test('buildTokens flattens theme into CSS custom properties', () => {
		const tokens = buildTokens(defaultTheme);

		// Check primary stops
		expect(tokens['--color-primary-500']).toBeDefined();
		expect(tokens['--color-neutral-50']).toBeDefined();
		expect(tokens['--color-neutral-900']).toBeDefined();

		// Check radius tokens
		expect(tokens['--radius-sm']).toBeDefined();
		expect(tokens['--radius-md']).toBeDefined();
		expect(tokens['--radius-lg']).toBeDefined();
		expect(tokens['--radius-xl']).toBeDefined();

		const ramps = buildRamps(defaultTheme);
		for (const role of colorRoles) {
			if (role === 'neutral') continue;
			const lightContrast = contrastRatio(ramps.neutral[50], ramps[role][500]);
			const darkContrast = contrastRatio(ramps.neutral[950], ramps[role][500]);
			const expectedForeground =
				lightContrast >= darkContrast ? ramps.neutral[50] : ramps.neutral[950];

			expect(tokens[`--on-${role}`]).toBe(formatOklch(expectedForeground));
			expect(Math.max(lightContrast, darkContrast)).toBeGreaterThanOrEqual(4.5);
		}
	});

	test('the Fluid preset matches the committed stylesheet defaults', () => {
		for (const [token, value] of Object.entries(buildTokens(defaultTheme))) {
			if (!token.startsWith('--color-') && !token.startsWith('--radius-')) continue;
			expect(fluidUiCss).toContain(`${token}: ${value};`);
		}
	});

	test('applyTheme sets properties on target element', () => {
		const mockElement = document.createElement('div');
		applyTheme(defaultTheme, mockElement);

		expect(mockElement.style.getPropertyValue('--color-primary-500')).toBeTruthy();
		expect(mockElement.style.getPropertyValue('--radius-md')).toBeTruthy();
	});

	test('clearTheme removes every runtime property applied by a theme', () => {
		const mockElement = document.createElement('div');
		applyTheme(defaultTheme, mockElement);
		clearTheme(defaultTheme, mockElement);

		expect(mockElement.style.getPropertyValue('--color-primary-500')).toBe('');
		expect(mockElement.style.getPropertyValue('--on-primary')).toBe('');
		expect(mockElement.style.getPropertyValue('--radius-md')).toBe('');
	});

	test('themeToCss reflects customized color values and radius in output CSS', () => {
		const customTheme: Theme = {
			name: 'Custom Coral',
			colors: {
				...defaultTheme.colors,
				primary: '#ff6b6b'
			},
			radius: 'full'
		};

		const cssOutput = themeToCss(customTheme);

		expect(cssOutput).toContain('Custom Coral');
		expect(cssOutput).toContain('@theme {');
		expect(cssOutput).toContain('--color-primary-500:');
		expect(cssOutput).toContain('--radius-md: 0.75rem;');
		expect(cssOutput).toContain('--on-primary:');

		// Changing primary color changes the generated CSS output
		const defaultCss = themeToCss(defaultTheme);
		expect(cssOutput).not.toEqual(defaultCss);
	});

	test('themeToFluidCss includes every component style with the selected theme embedded', () => {
		const customTheme: Theme = {
			name: 'Complete Coral',
			colors: {
				...defaultTheme.colors,
				primary: '#ff6b6b'
			},
			radius: 'full'
		};
		const tokens = buildTokens(customTheme);
		const cssOutput = themeToFluidCss(customTheme, fluidUiCss);

		expect(cssOutput).toContain('Complete Coral');
		expect(cssOutput).toContain("@import 'tailwindcss';");
		expect(cssOutput).toContain('.fluid-button-primary {');
		expect(cssOutput).toContain('.fluid-modal-container {');
		expect(cssOutput).not.toContain("@import './fluidui.css';");
		expect(cssOutput).toContain(`--color-primary-500: ${tokens['--color-primary-500']};`);
		expect(cssOutput).toContain(`--on-primary: ${tokens['--on-primary']};`);
		expect(cssOutput).toContain('--radius-md: 0.75rem;');
		expect(cssOutput.match(/--color-primary-500:/g)).toHaveLength(1);
	});

	test('themeToFluidCss rejects an incomplete canonical stylesheet', () => {
		expect(() => themeToFluidCss(defaultTheme, '.fluid-button {}')).toThrow(
			'The canonical Fluid stylesheet is missing --color-neutral-50.'
		);
	});

	test('presets are well formed and produce distinct styles', () => {
		expect(presets.length).toBeGreaterThan(1);
		for (const preset of presets) {
			expect(preset.name).toBeTruthy();
			expect(preset.colors.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
			const css = themeToCss(preset);
			expect(css).toContain(`/* ${preset.name} — generated by the Fluid UI theme editor */`);
		}
	});
});
