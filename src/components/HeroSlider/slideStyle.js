/**
 * Baut die Inline-CSS-Variablen einer Slide (Schrift + Button-Styling).
 * Entspricht 1:1 der Style-Erzeugung aus dem Original-Script.
 *
 * @param {import('../../types/slider').SlideData} slide
 * @returns {import('../../types/slider').SlideStyle}
 */
export function buildSlideStyle(slide) {
	const fallbackFont = '"Open Sans", sans-serif';

	/** @type {Record<string, string>} */
	const vars = {
		'--slider-author-color': slide.authorColor || '#ffffff',
		'--slider-author-size': `${slide.authorFontSize || 14}px`,
		'--slider-author-font': slide.authorFontFamily || fallbackFont,
		'--slider-title-color': slide.titleColor || '#ffffff',
		'--slider-title-size': `${slide.titleFontSize || 48}px`,
		'--slider-title-font': slide.titleFontFamily || fallbackFont,
		'--slider-topic-color': slide.topicColor || '#f1683a',
		'--slider-topic-size': `${slide.topicFontSize || 48}px`,
		'--slider-topic-font': slide.topicFontFamily || fallbackFont,
		...buttonVars('button1', slide),
		...buttonVars('button2', slide),
	};

	return /** @type {import('../../types/slider').SlideStyle} */ (vars);
}

/**
 * @param {'button1' | 'button2'} prefix
 * @param {import('../../types/slider').SlideData} slide
 * @returns {Record<string, string>}
 */
function buttonVars(prefix, slide) {
	/** @type {Record<string, any>} */
	const s = slide;
	/** @type {Record<string, string>} */
	const out = {};

	const map = [
		['Color', 'color', ''],
		['TextColor', 'textcolor', ''],
		['HoverColor', 'hovercolor', ''],
		['HoverTextColor', 'hovertextcolor', ''],
		['BorderRadius', 'borderradius', 'px'],
		['OutlineColor', 'outlinecolor', ''],
		['OutlineWidth', 'outlinewidth', 'px'],
	];

	for (const [jsonKey, cssKey, unit] of map) {
		const value = s[prefix + jsonKey];
		if (value) out[`--slider-${prefix}-${cssKey}`] = `${value}${unit}`;
	}
	return out;
}
