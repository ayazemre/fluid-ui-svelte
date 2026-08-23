import { browser } from '$app/environment';
import {
	applyTheme,
	clearTheme,
	isRadiusId,
	type ColorRole,
	type RadiusId,
	type Theme
} from './theme';
import { isHex } from './color';
import { defaultTheme, presets } from './presets';

const STORAGE_KEY = 'fluid-ui-theme';

const cloneTheme = (theme: Theme): Theme => ({ ...theme, colors: { ...theme.colors } });

const readStoredTheme = (): Theme => {
	if (!browser) return cloneTheme(defaultTheme);
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return cloneTheme(defaultTheme);
		const parsed = JSON.parse(stored) as Theme;
		// Untrusted input: anything that isn't a known role with a #rrggbb value
		// would otherwise flow into hexToOklch and poison every token with NaN.
		const storedColors = Object.fromEntries(
			Object.entries(parsed.colors ?? {}).filter(
				([role, value]) => role in defaultTheme.colors && isHex(value)
			)
		);
		return {
			name: typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name : defaultTheme.name,
			radius: isRadiusId(parsed.radius) ? parsed.radius : defaultTheme.radius,
			colors: { ...defaultTheme.colors, ...storedColors }
		};
	} catch {
		return cloneTheme(defaultTheme);
	}
};

class ThemeStore {
	current = $state<Theme>(cloneTheme(defaultTheme));

	load() {
		// fluidui.css IS the default theme, byte for byte. With nothing stored
		// there is nothing to apply — inline overrides would only restyle the
		// site with a copy of its own stylesheet.
		if (!browser || !localStorage.getItem(STORAGE_KEY)) return;
		this.current = readStoredTheme();
		this.sync();
	}

	setColor(role: ColorRole, hex: string) {
		if (!isHex(hex)) return;
		this.current.colors[role] = hex;
		this.current.name = 'Custom';
		this.sync();
	}

	setRadius(radius: RadiusId) {
		this.current.radius = radius;
		this.current.name = 'Custom';
		this.sync();
	}

	usePreset(preset: Theme) {
		this.current = cloneTheme(preset);
		this.sync();
	}

	reset() {
		// Back to the stylesheet itself, not to a stored copy of it.
		this.current = cloneTheme(defaultTheme);
		if (!browser) return;
		clearTheme(this.current, document.documentElement);
		localStorage.removeItem(STORAGE_KEY);
	}

	private sync() {
		if (!browser) return;
		applyTheme($state.snapshot(this.current), document.documentElement);
		localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(this.current)));
	}
}

export const themeStore = new ThemeStore();
export { presets };
