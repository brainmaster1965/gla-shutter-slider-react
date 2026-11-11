/** @param {import('../../types/slider').SliderArrowsProps} props */
export default function SliderArrows({ onPrev, onNext }) {
	return (
		<div className="slide-arrows">
			<button type="button" aria-label="Vorherige Slide" onClick={onPrev}>
				&lt;
			</button>
			<button type="button" aria-label="Nächste Slide" onClick={onNext}>
				&gt;
			</button>
		</div>
	);
}
