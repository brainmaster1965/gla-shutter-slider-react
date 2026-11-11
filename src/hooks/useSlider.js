import { useCallback, useEffect, useReducer } from 'react';

/** @type {import('../types/slider').SliderState} */
const initialState = { current: 0, target: null, direction: null };

/**
 * @param {import('../types/slider').SliderState} state
 * @param {import('../types/slider').SliderAction} action
 * @returns {import('../types/slider').SliderState}
 */
function reducer(state, action) {
	if (action.type === 'finish') {
		if (state.target === null) return state;
		return { current: state.target, target: null, direction: null };
	}

	// Während einer laufenden Animation werden Eingaben ignoriert
	if (state.target !== null || action.count < 2) return state;

	const { count } = action;
	const { current } = state;

	if (action.type === 'step') {
		const target =
			action.direction === 'next'
				? (current + 1) % count
				: (current - 1 + count) % count;
		return { current, target, direction: action.direction };
	}

	// jump
	const { target } = action;
	if (target === current || target < 0 || target >= count) return state;
	return { current, target, direction: resolveDirection(current, target, count) };
}

/**
 * Nachbarn laufen wie Next/Prev (inkl. Wrap-around), alles andere nach Index.
 *
 * @param {number} current
 * @param {number} target
 * @param {number} count
 * @returns {import('../types/slider').SlideDirection}
 */
function resolveDirection(current, target, count) {
	if (target === (current + 1) % count) return 'next';
	if (target === (current - 1 + count) % count) return 'prev';
	return target > current ? 'next' : 'prev';
}

/**
 * Slider-Zustandsmaschine: idle -> Shutter läuft -> idle. Enthält auch das Autoplay.
 *
 * @param {import('../types/slider').UseSliderOptions} options
 * @returns {import('../types/slider').UseSliderResult}
 */
export function useSlider({ count, duration, autoplay, interval, paused }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const isAnimating = state.target !== null;

	const next = useCallback(
		() => dispatch({ type: 'step', count, direction: 'next' }),
		[count],
	);
	const prev = useCallback(
		() => dispatch({ type: 'step', count, direction: 'prev' }),
		[count],
	);
	const goTo = useCallback(
		(/** @type {number} */ index) => dispatch({ type: 'jump', count, target: index }),
		[count],
	);

	// Shutter-Ende: nach `duration` wird die Ziel-Slide zur aktuellen
	useEffect(() => {
		if (state.target === null) return;
		const id = setTimeout(() => dispatch({ type: 'finish' }), duration);
		return () => clearTimeout(id);
	}, [state.target, duration]);

	// Autoplay: Timer startet nach jedem Wechsel neu, pausiert bei Hover/Drag
	useEffect(() => {
		if (!autoplay || paused || isAnimating || count < 2) return;
		const id = setTimeout(
			() => dispatch({ type: 'step', count, direction: 'next' }),
			interval,
		);
		return () => clearTimeout(id);
	}, [autoplay, paused, isAnimating, state.current, interval, count]);

	return {
		current: state.current,
		target: state.target,
		direction: state.direction,
		isAnimating,
		next,
		prev,
		goTo,
	};
}
