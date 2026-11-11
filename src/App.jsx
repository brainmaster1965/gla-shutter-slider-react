import { useState } from 'react';
import HeroSlider from './components/HeroSlider/HeroSlider';
import Documentation from './components/Documentation/Documentation';
import { useSlides } from './hooks/useSlides';

export default function App() {
	const [currentView, setCurrentView] = useState('demo'); // 'demo' oder 'docs'
	const { slides, loading, error } = useSlides('/json/slides.json');

	return (
		<>
			<header className="demo-header">
				<a
					href="#"
					className="demo-brand"
					onClick={(e) => {
						e.preventDefault();
						setCurrentView('demo');
					}}
				>
					<img src="/images/logo.png" alt="WebDevGLa Logo" />
					<span>WebDevGLa</span>
				</a>
				<nav className="demo-nav">
					<a
						href="#documentation"
						onClick={(e) => {
							e.preventDefault();
							setCurrentView(
								currentView === 'docs' ? 'demo' : 'docs',
							);
						}}
					>
						{currentView === 'docs'
							? 'Back to Demo'
							: 'Documentation'}
					</a>
				</nav>
			</header>

			{/* VIEW SWITCHER */}
			{currentView === 'docs' ? (
				<div style={{ paddingTop: '80px' }}>
					<Documentation onBack={() => setCurrentView('demo')} />
				</div>
			) : (
				<>
					{error && <p className="demo-status">{error.message}</p>}
					{loading && (
						<div className="demo-status">Lade Slides …</div>
					)}

					{slides.length > 0 && (
						<HeroSlider
							slides={slides}
							autoplay
							interval={7000}
							stopOnHover
							hideProgress={false}
							hideNavigation={false}
							hidePagination={false}
						/>
					)}

					<section className="demo-next-section">
						<h2>Scroll Down Parallax Test Area</h2>
						<p>
							Der transparente Header überlagert den
							Fullscreen-Slider, beim Scrollen läuft der
							Parallax-Effekt der Hintergrundbilder.
						</p>
					</section>

					<footer className="demo-footer">
						<div className="footer-brand">
							<img src="/images/logo.png" alt="" />
							<span>WebDevGLa</span>
						</div>
						<div>&copy; 2026 WebDevGLa. All rights reserved.</div>
					</footer>
				</>
			)}
		</>
	);
}
