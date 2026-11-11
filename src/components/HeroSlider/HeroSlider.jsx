import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useSlider } from '../../hooks/useSlider';
import SlideItem from './SlideItem';
import SliderArrows from './SliderArrows';
import SliderPagination from './SliderPagination';
import './HeroSlider.css';

const MIN_SWIPE_DISTANCE = 50;

/** @param {import('../../types/slider').HeroSliderProps} props */
export default function HeroSlider({
	slides,
	autoplay = true,
	interval = 7000,
	stopOnHover = true,
	hideProgress = false,
	hideNavigation = false,
	hidePagination = false,
	shutterDuration = 1500,
}) {
	const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null));
	const dragRef = useRef(/** @type {{ x: number } | null} */ (null));

	const [hovered, setHovered] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [ready, setReady] = useState(false);

	// "Bewegung reduzieren": Wechsel praktisch sofort, ohne Shutter
	const duration = usePrefersReducedMotion() ? 1 : shutterDuration;

	const slider = useSlider({
		count: slides.length,
		duration,
		autoplay,
		interval,
		paused: (stopOnHover && hovered) || dragging,
	});

	// Parallax: schreibt --parallax-offset direkt ins DOM, ohne Re-Render
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const update = () => {
			const rect = root.getBoundingClientRect();
			const vh = window.innerHeight;
			if (rect.top <= vh && rect.bottom >= 0) {
				const progress = (vh - rect.top) / (vh + rect.height);
				root.style.setProperty('--parallax-offset', `${-(progress * vh * 0.5)}px`);
			}
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	// Fade-in der Bilder nach dem ersten Paint
	useEffect(() => {
		const id = requestAnimationFrame(() => setReady(true));
		return () => cancelAnimationFrame(id);
	}, []);

	/** @param {import('react').PointerEvent<HTMLDivElement>} e */
	const handlePointerDown = (e) => {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		if (/** @type {HTMLElement} */ (e.target).closest('a, button')) return;
		dragRef.current = { x: e.clientX };
		setDragging(true);
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	/** @param {import('react').PointerEvent<HTMLDivElement>} e */
	const handlePointerUp = (e) => {
		const drag = dragRef.current;
		if (!drag) return;
		dragRef.current = null;
		setDragging(false);

		const distance = e.clientX - drag.x;
		if (Math.abs(distance) < MIN_SWIPE_DISTANCE) return;
		if (distance < 0) slider.next();
		else slider.prev();
	};

	const handlePointerCancel = () => {
		dragRef.current = null;
		setDragging(false);
	};

	/** @param {import('react').PointerEvent<HTMLDivElement>} e */
	const handlePointerEnter = (e) => {
		if (e.pointerType === 'mouse') setHovered(true);
	};

	const className = [
		'shutter-slider',
		ready && 'is-ready',
		slider.isAnimating && 'is-animating',
		slider.direction,
	]
		.filter(Boolean)
		.join(' ');

	const style = /** @type {import('../../types/slider').SlideStyle} */ ({
		'--shutter-duration': `${duration}ms`,
	});

	return (
		<div
			ref={rootRef}
			className={className}
			style={style}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={() => setHovered(false)}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerCancel}
		>
			{!hideProgress && <div className="slide-time" />}

			<div className="slide-list">
				{slides.map((slide, index) => {
					const isCurrent = index === slider.current;
					return (
						<SlideItem
							key={index}
							slide={slide}
							isCurrent={isCurrent}
							isTarget={index === slider.target}
							leavingDirection={isCurrent ? slider.direction : null}
						/>
					);
				})}
			</div>

			{!hideNavigation && (
				<SliderArrows onPrev={slider.prev} onNext={slider.next} />
			)}
			{!hidePagination && (
				<SliderPagination
					count={slides.length}
					activeIndex={slider.target ?? slider.current}
					onSelect={slider.goTo}
				/>
			)}
		</div>
	);
}
