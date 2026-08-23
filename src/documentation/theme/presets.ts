import type { Theme } from './theme';

/**
 * Six starting points, not six destinations. Each one only fixes the base
 * colours and the radius; every ramp is generated, so a preset and a fully
 * hand-tuned theme are the same kind of object.
 */
export const presets: Theme[] = [
	{
		name: 'Fluid',
		radius: 'medium',
		colors: {
			neutral: '#71717a',
			primary: '#3e6ff3',
			secondary: '#8b5cf6',
			tertiary: '#0ea5e9',
			success: '#10b981',
			warning: '#f59e0b',
			info: '#0ea5e9',
			error: '#ef4444'
		}
	},
	{
		name: 'Graphite',
		radius: 'small',
		colors: {
			neutral: '#6b7280',
			primary: '#4b5563',
			secondary: '#78716c',
			tertiary: '#57534e',
			success: '#4d7c0f',
			warning: '#a16207',
			info: '#475569',
			error: '#b91c1c'
		}
	},
	{
		name: 'Ember',
		radius: 'medium',
		colors: {
			neutral: '#78716c',
			primary: '#f97316',
			secondary: '#e11d48',
			tertiary: '#f59e0b',
			success: '#65a30d',
			warning: '#eab308',
			info: '#0d9488',
			error: '#dc2626'
		}
	},
	{
		name: 'Forest',
		radius: 'large',
		colors: {
			neutral: '#737373',
			primary: '#15803d',
			secondary: '#0f766e',
			tertiary: '#65a30d',
			success: '#16a34a',
			warning: '#ca8a04',
			info: '#0891b2',
			error: '#dc2626'
		}
	},
	{
		name: 'Violet',
		radius: 'large',
		colors: {
			neutral: '#78716c',
			primary: '#7c3aed',
			secondary: '#c026d3',
			tertiary: '#6366f1',
			success: '#059669',
			warning: '#d97706',
			info: '#8b5cf6',
			error: '#e11d48'
		}
	},
	{
		name: 'Nord',
		radius: 'small',
		colors: {
			neutral: '#6b7684',
			primary: '#5e81ac',
			secondary: '#88c0d0',
			tertiary: '#81a1c1',
			success: '#a3be8c',
			warning: '#ebcb8b',
			info: '#8fbcbb',
			error: '#bf616a'
		}
	}
];

export const defaultTheme = presets[0];
