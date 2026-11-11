import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Liefert true, wenn das Betriebssystem "Bewegung reduzieren" aktiviert hat.
 *
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);

	useEffect(() => {
		const media = window.matchMedia(QUERY);
		const onChange = () => setReduced(media.matches);
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, []);

	return reduced;
}
