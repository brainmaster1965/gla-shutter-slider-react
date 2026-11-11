import type { CSSProperties } from 'react';

/* ---------- Daten (slides.json) ---------- */

export type VerticalAlign = 'top' | 'center' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type SlideAlignment = `${VerticalAlign}-${HorizontalAlign}`;

export interface SlideContentVisibility {
	author?: boolean;
	title?: boolean;
	topic?: boolean;
	description?: boolean;
	button1?: boolean;
	button2?: boolean;
}

export interface SlideData {
	showContent?: SlideContentVisibility;
	imageUrl?: string;
	alignment?: SlideAlignment;

	author?: string;
	authorColor?: string;
	authorFontSize?: number;
	authorFontFamily?: string;

	title?: string;
	titleColor?: string;
	titleFontSize?: number;
	titleFontFamily?: string;

	topic?: string;
	topicColor?: string;
	topicFontSize?: number;
	topicFontFamily?: string;

	description?: string;

	button1Text?: string;
	button1Url?: string;
	button1Color?: string;
	button1TextColor?: string;
	button1HoverColor?: string;
	button1HoverTextColor?: string;
	button1BorderRadius?: number;
	button1Outline?: boolean;
	button1OutlineColor?: string;
	button1OutlineWidth?: number;

	button2Text?: string;
	button2Url?: string;
	button2Color?: string;
	button2TextColor?: string;
	button2HoverColor?: string;
	button2HoverTextColor?: string;
	button2BorderRadius?: number;
	button2Outline?: boolean;
	button2OutlineColor?: string;
	button2OutlineWidth?: number;
}

export interface SlidesFile {
	settings?: { version?: string; author?: string };
	slides: Record<string, SlideData>;
}

/* ---------- Slider-Zustand ---------- */

/** 'next': Shutter läuft von rechts nach links. 'prev': von links nach rechts. */
export type SlideDirection = 'next' | 'prev';

export interface SliderState {
	/** Aktuell sichtbare (bzw. gerade ausblendende) Slide */
	current: number;
	/** Slide, die gerade freigegeben wird. null = keine Animation aktiv */
	target: number | null;
	direction: SlideDirection | null;
}

export type SliderAction =
	/** Direkter Nachbar in der angegebenen Richtung */
	| { type: 'step'; count: number; direction: SlideDirection }
	/** Beliebige Slide (Richtung wird aus dem Index abgeleitet) */
	| { type: 'jump'; count: number; target: number }
	| { type: 'finish' };

/* ---------- Hooks ---------- */

export interface UseSliderOptions {
	count: number;
	/** Dauer des Shutters in ms (muss zur CSS-Variable passen, wird als solche gesetzt) */
	duration: number;
	autoplay: boolean;
	/** Wartezeit bis zum automatischen Wechsel in ms */
	interval: number;
	paused: boolean;
}

export interface UseSliderResult {
	current: number;
	target: number | null;
	direction: SlideDirection | null;
	isAnimating: boolean;
	next: () => void;
	prev: () => void;
	goTo: (index: number) => void;
}

export interface UseSlidesResult {
	slides: SlideData[];
	loading: boolean;
	error: Error | null;
}

/* ---------- Komponenten ---------- */

export interface HeroSliderProps {
	slides: SlideData[];
	autoplay?: boolean;
	/** ms */
	interval?: number;
	stopOnHover?: boolean;
	hideProgress?: boolean;
	hideNavigation?: boolean;
	hidePagination?: boolean;
	/** Shutter-Dauer in ms */
	shutterDuration?: number;
}

export interface SlideItemProps {
	slide: SlideData;
	isCurrent: boolean;
	isTarget: boolean;
	/** Nur gesetzt, solange diese Slide per Shutter ausgeblendet wird */
	leavingDirection: SlideDirection | null;
}

export interface SliderArrowsProps {
	onPrev: () => void;
	onNext: () => void;
}

export interface SliderPaginationProps {
	count: number;
	activeIndex: number;
	onSelect: (index: number) => void;
}

/* ---------- Inline-CSS-Variablen pro Slide ---------- */

export type CssCustomProperties = Record<`--${string}`, string>;
export type SlideStyle = CSSProperties & CssCustomProperties;
