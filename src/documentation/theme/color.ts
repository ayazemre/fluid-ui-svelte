export type Oklch = { l: number; c: number; h: number };

const SRGB_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type RampStop = (typeof SRGB_STOPS)[number];
export type Ramp = Record<RampStop, Oklch>;

export const rampStops = SRGB_STOPS;

const linearize = (channel: number) =>
	channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const delinearize = (channel: number) =>
	channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;

const linearSrgbToOklab = (r: number, g: number, b: number) => {
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

	return {
		l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
		a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
		b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
	};
};

const oklabToLinearSrgb = (L: number, a: number, b: number) => {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

	return {
		r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
	};
};

export const isHex = (value: unknown): value is string =>
	typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);

export const hexToOklch = (hex: string): Oklch => {
	const normalized = hex.trim().replace('#', '');
	const expanded =
		normalized.length === 3
			? normalized
					.split('')
					.map((character) => character + character)
					.join('')
			: normalized;

	const r = linearize(parseInt(expanded.slice(0, 2), 16) / 255);
	const g = linearize(parseInt(expanded.slice(2, 4), 16) / 255);
	const b = linearize(parseInt(expanded.slice(4, 6), 16) / 255);

	const lab = linearSrgbToOklab(r, g, b);
	const chroma = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
	const hue = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;

	return { l: lab.l, c: chroma, h: hue < 0 ? hue + 360 : hue };
};

const oklchToLinearSrgb = ({ l, c, h }: Oklch) => {
	const radians = (h * Math.PI) / 180;
	return oklabToLinearSrgb(l, c * Math.cos(radians), c * Math.sin(radians));
};

const isDisplayable = (color: Oklch) => {
	const { r, g, b } = oklchToLinearSrgb(color);
	const tolerance = 1e-4;
	return [r, g, b].every((channel) => channel >= -tolerance && channel <= 1 + tolerance);
};

/**
 * Reduces chroma until the colour fits inside sRGB. Lightness and hue are held
 * fixed so a ramp keeps an even perceptual rhythm even where the gamut pinches.
 */
const clampToGamut = (color: Oklch): Oklch => {
	if (isDisplayable(color)) return color;

	let low = 0;
	let high = color.c;
	for (let iteration = 0; iteration < 24; iteration += 1) {
		const mid = (low + high) / 2;
		if (isDisplayable({ ...color, c: mid })) low = mid;
		else high = mid;
	}
	return { ...color, c: low };
};

export const oklchToHex = (color: Oklch): string => {
	const { r, g, b } = oklchToLinearSrgb(clampToGamut(color));
	const toChannel = (channel: number) =>
		Math.round(Math.min(1, Math.max(0, delinearize(channel))) * 255)
			.toString(16)
			.padStart(2, '0');

	return `#${toChannel(r)}${toChannel(g)}${toChannel(b)}`;
};

export const formatOklch = (color: Oklch): string => {
	const { l, c, h } = clampToGamut(color);
	const round = (value: number, places: number) => Number(value.toFixed(places));
	return `oklch(${round(l, 4)} ${round(c, 4)} ${round(h, 2)})`;
};

const relativeLuminance = (color: Oklch): number => {
	const { r, g, b } = oklchToLinearSrgb(clampToGamut(color));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (first: Oklch, second: Oklch): number => {
	const firstLuminance = relativeLuminance(first);
	const secondLuminance = relativeLuminance(second);
	return (
		(Math.max(firstLuminance, secondLuminance) + 0.05) /
		(Math.min(firstLuminance, secondLuminance) + 0.05)
	);
};

/**
 * Chromatic and neutral ramps need different tails: a neutral -950 is a page
 * surface, while a chromatic -950 still needs enough colour to read as its hue.
 * The values describe the curve shape; the selected colour remains the exact
 * 500-stop anchor.
 */
const CHROMATIC_STOP_LIGHTNESS: Record<RampStop, number> = {
	50: 0.971,
	100: 0.936,
	200: 0.885,
	300: 0.808,
	400: 0.704,
	500: 0.637,
	600: 0.577,
	700: 0.505,
	800: 0.443,
	900: 0.396,
	950: 0.258
};

const NEUTRAL_STOP_LIGHTNESS: Record<RampStop, number> = {
	50: 0.985,
	100: 0.967,
	200: 0.92,
	300: 0.87,
	400: 0.705,
	500: 0.554,
	600: 0.442,
	700: 0.37,
	800: 0.274,
	900: 0.21,
	950: 0.141
};

/** Chroma peaks around the 500-600 stops and falls away at both extremes. */
const STOP_CHROMA_SCALE: Record<RampStop, number> = {
	50: 0.12,
	100: 0.22,
	200: 0.42,
	300: 0.66,
	400: 0.88,
	500: 1,
	600: 0.98,
	700: 0.88,
	800: 0.76,
	900: 0.66,
	950: 0.44
};

export type RampOptions = { neutral?: boolean };

const anchoredLightness = (
	baseLightness: number,
	stop: RampStop,
	targets: Record<RampStop, number>
): number => {
	const target = targets[stop];
	const anchor = targets[500];

	if (target >= anchor) {
		return baseLightness + ((target - anchor) / (1 - anchor)) * (1 - baseLightness);
	}

	return baseLightness * (target / anchor);
};

/**
 * Builds an 11-stop ramp from a 500-stop colour. The anchor is preserved, while
 * the surrounding stops follow a shared perceptual curve.
 */
export const generateRamp = (baseHex: string, options: RampOptions = {}): Ramp => {
	const base = hexToOklch(baseHex);
	const peakChroma = options.neutral ? Math.min(base.c, 0.02) : base.c;
	const lightnessTargets = options.neutral ? NEUTRAL_STOP_LIGHTNESS : CHROMATIC_STOP_LIGHTNESS;

	return Object.fromEntries(
		rampStops.map((stop) => [
			stop,
			clampToGamut({
				l: anchoredLightness(base.l, stop, lightnessTargets),
				c: peakChroma * STOP_CHROMA_SCALE[stop],
				h: base.h
			})
		])
	) as Ramp;
};
