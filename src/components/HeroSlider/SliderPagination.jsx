/** @param {import('../../types/slider').SliderPaginationProps} props */
export default function SliderPagination({ count, activeIndex, onSelect }) {
	return (
		<div className="slide-pagination">
			{Array.from({ length: count }, (_, i) => (
				<button
					key={i}
					type="button"
					className={i === activeIndex ? 'active' : undefined}
					aria-label={`Zu Slide ${i + 1}`}
					aria-current={i === activeIndex}
					onClick={() => onSelect(i)}
				/>
			))}
		</div>
	);
}
