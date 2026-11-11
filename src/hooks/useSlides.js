import { useEffect, useState } from 'react';

/**
 * Lädt die Slides aus einer JSON-Datei ({ slides: { slide1: {...}, ... } })
 * und wandelt das Objekt in ein Array um.
 *
 * @param {string} url
 * @returns {import('../types/slider').UseSlidesResult}
 */
export function useSlides(url) {
	const [state, setState] = useState({
		slides: /** @type {import('../types/slider').SlideData[]} */ ([]),
		loading: true,
		error: /** @type {Error | null} */ (null),
	});

	useEffect(() => {
		const controller = new AbortController();

		async function load() {
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) throw new Error(`Fehler beim Laden von ${url}`);

				/** @type {import('../types/slider').SlidesFile} */
				const data = await response.json();
				if (!data.slides) throw new Error("Keine 'slides' in der JSON gefunden.");

				setState({ slides: Object.values(data.slides), loading: false, error: null });
			} catch (err) {
				if (controller.signal.aborted) return;
				setState({
					slides: [],
					loading: false,
					error: err instanceof Error ? err : new Error(String(err)),
				});
			}
		}

		load();
		return () => controller.abort();
	}, [url]);

	return state;
}
