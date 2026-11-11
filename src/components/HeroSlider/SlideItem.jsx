import { buildSlideStyle } from './slideStyle';

/**
 * Eine einzelne Slide. Alle Slides bleiben gemountet, damit Bilder geladen
 * sind und die Shutter-Transition auf demselben DOM-Element laufen kann.
 *
 * @param {import('../../types/slider').SlideItemProps} props
 */
export default function SlideItem({ slide, isCurrent, isTarget, leavingDirection }) {
	const show = slide.showContent ?? {};
	const anyVisible = Object.values(show).some((v) => v === true);
	const alignment = `align-${slide.alignment ?? 'center-center'}`;

	const className = [
		'slide-item',
		isCurrent && 'is-current',
		isTarget && 'is-target',
		leavingDirection && `is-leaving leaving-${leavingDirection}`,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			className={className}
			style={buildSlideStyle(slide)}
			inert={!isCurrent}
		>
			<div className="slide-wrapper">
				{slide.imageUrl && (
					<img src={slide.imageUrl} alt={slide.title ?? ''} draggable={false} />
				)}

				{anyVisible && (
					<div className={`slide-content ${alignment}`}>
						{show.author && slide.author && (
							<div className="slide-author">{slide.author}</div>
						)}
						{show.title && slide.title && (
							<div className="slide-title">{slide.title}</div>
						)}
						{show.topic && slide.topic && (
							<div className="slide-topic">{slide.topic}</div>
						)}
						{show.description && slide.description && (
							<div className="slide-description">{slide.description}</div>
						)}

						{(show.button1 || show.button2) && (
							<div className="slide-buttons">
								{show.button1 && slide.button1Text && (
									<a
										href={slide.button1Url || '#'}
										className={`button-1${slide.button1Outline ? ' has-outline' : ''}`}
									>
										{slide.button1Text}
									</a>
								)}
								{show.button2 && slide.button2Text && (
									<a
										href={slide.button2Url || '#'}
										className={`button-2${slide.button2Outline ? ' has-outline' : ''}`}
									>
										{slide.button2Text}
									</a>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
