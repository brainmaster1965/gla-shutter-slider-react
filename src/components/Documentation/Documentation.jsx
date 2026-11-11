import React from 'react';

export default function Documentation({ onBack }) {
	const cardStyle = {
		backgroundColor: '#18181c',
		border: '1px solid #2d2d32',
		borderRadius: '8px',
		padding: '24px',
		marginBottom: '20px',
	};

	const headingStyle = {
		color: '#fff',
		borderBottom: '1px solid #2d2d32',
		paddingBottom: '8px',
		marginTop: '40px',
	};

	const codeStyle = {
		fontFamily: "'Fira Code', Monaco, Consolas, monospace",
		backgroundColor: '#222226',
		color: '#f8f8f2',
		padding: '16px',
		borderRadius: '4px',
		overflowX: 'auto',
		fontSize: '0.85rem',
	};

	const tableStyle = {
		width: '100%',
		borderCollapse: 'collapse',
		marginTop: '15px',
	};

	const thTdStyle = {
		border: '1px solid #2d2d32',
		padding: '10px 12px',
		textAlign: 'left',
		fontSize: '0.9rem',
	};

	return (
		<div
			style={{
				backgroundColor: '#0f0f11',
				minHeight: '100vh',
				color: '#e1e1e6',
				padding: '40px 20px',
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
				lineHeight: 1.6,
			}}
		>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				{/* Back Button */}
				<div style={{ marginBottom: '20px' }}>
					<button
						onClick={onBack}
						style={{
							background: '#f1683a',
							color: '#fff',
							border: 'none',
							padding: '10px 20px',
							borderRadius: '4px',
							fontWeight: '600',
							cursor: 'pointer',
							transition: 'background 0.3s',
						}}
					>
						&larr; Back to Slider Demo
					</button>
				</div>

				<header
					style={{
						borderBottom: '1px solid #2d2d32',
						paddingBottom: '20px',
						marginBottom: '40px',
					}}
				>
					<h1
						style={{
							color: '#fff',
							fontSize: '2.2rem',
							margin: '0 0 10px 0',
						}}
					>
						Gla Shutter Hero Slider – React{' '}
						<span
							style={{
								backgroundColor: '#f1683a',
								color: '#fff',
								padding: '4px 10px',
								borderRadius: '4px',
								fontSize: '0.85rem',
								fontWeight: 600,
							}}
						>
							v2.3.0
						</span>
					</h1>
					<p style={{ color: '#a1a1aa', margin: 0 }}>
						Comprehensive Documentation & Guide by{' '}
						<strong>WebDevGLa</strong>
					</p>
				</header>

				{/* Section 1 */}
				<section style={cardStyle}>
					<h2 style={{ ...headingStyle, marginTop: 0 }}>
						1. Overview & Key Features
					</h2>
					<p>
						A fullscreen hero slider with a cinematic{' '}
						<strong>shutter reveal</strong> (CSS{' '}
						<code>clip-path</code>) and scroll{' '}
						<strong>parallax</strong>. React port of the vanilla
						&quot;Gla Shutter Hero Slider&quot; –{' '}
						<strong>no third-party libraries</strong> besides React
						itself (no GSAP, no jQuery, no Tailwind).
					</p>
					<div
						style={{
							background: 'rgba(241, 104, 58, 0.1)',
							borderLeft: '4px solid #f1683a',
							padding: '15px',
							margin: '20px 0',
							borderRadius: '4px',
						}}
					>
						<strong>🚀 100% Dependency-Free Core:</strong> Built
						strictly using modern React principles, custom hooks,
						and native CSS. Zero heavy third-party framework
						overhead.
					</div>
					<ul style={{ paddingLeft: '20px' }}>
						<li style={{ marginBottom: '8px' }}>
							<strong>Shutter Direction:</strong> <em>Next</em>{' '}
							reveals the new image from right to left,{' '}
							<em>prev</em> from left to right.
						</li>
						<li style={{ marginBottom: '8px' }}>
							<strong>Precise Pagination:</strong> Any pagination
							dot is ONE single shutter (no rotating through
							intermediate slides).
						</li>
						<li style={{ marginBottom: '8px' }}>
							<strong>Interactive Controls:</strong> Autoplay with
							progress bar, pause on hover, touch swipe, and mouse
							drag via Pointer Events.
						</li>
						<li style={{ marginBottom: '8px' }}>
							<strong>JSON-Driven Architecture:</strong> Content,
							typography, 9 alignment positions, and button
							styling configured per slide.
						</li>
						<li style={{ marginBottom: '8px' }}>
							<strong>Accessibility & Performance:</strong>{' '}
							Labeled controls, hidden slides marked as{' '}
							<code>inert</code>, and full support for{' '}
							<code>prefers-reduced-motion</code>.
						</li>
						<li style={{ marginBottom: '8px' }}>
							<strong>Type Safe:</strong> Plain JSX components
							with a single central type definition file (
							<code>src/types/slider.ts</code>).
						</li>
					</ul>
				</section>

				{/* Section 2 */}
				<section style={cardStyle}>
					<h2 style={headingStyle}>
						2. Quick Start & Project Structure
					</h2>
					<p>
						Get up and running quickly with npm commands and
						standard React/Vite integration:
					</p>
					<pre style={codeStyle}>
						<code>{`npm install
npm run dev        # development server (Vite)
npm run build      # production build
npm run typecheck  # type check of JSDoc annotations against src/types/slider.ts`}</code>
					</pre>

					<p style={{ marginTop: '20px' }}>
						<strong>Basic Implementation Example (App.jsx):</strong>
					</p>
					<pre style={codeStyle}>
						<code>{`import HeroSlider from './components/HeroSlider/HeroSlider';
import { useSlides } from './hooks/useSlides';

export default function App() {
  const { slides, loading, error } = useSlides('/json/slides.json');

  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading …</p>;

  return <HeroSlider slides={slides} autoplay interval={7000} />;
}`}</code>
					</pre>

					<p style={{ marginTop: '20px' }}>
						<strong>Project Directory Structure:</strong>
					</p>
					<pre style={codeStyle}>
						<code>{`public/
  json/slides.json                   central data source for all slides
  images/                            slide images + logo
src/
  types/slider.ts                    ALL types (data, state, hooks, props)
  hooks/
    useSlider.js                     state machine (reducer) + autoplay
    useSlides.js                     loads slides.json
    usePrefersReducedMotion.js       OS setting "reduce motion"
  components/
    HeroSlider/
      HeroSlider.jsx                 container: parallax, swipe, hover pause
      SlideItem.jsx
      SliderArrows.jsx
      SliderPagination.jsx
      slideStyle.js                  per-slide CSS variables (fonts, buttons)
      HeroSlider.css
    Documentation/
      Documentation.jsx              this documentation component
  App.jsx / App.css                  demo page (not part of the component)`}</code>
					</pre>
				</section>

				{/* Section 3 */}
				<section style={cardStyle}>
					<h2 style={headingStyle}>
						3. How it Works (Architecture & Shutter Logic)
					</h2>
					<p>
						All slides stay mounted simultaneously. The outgoing
						slide lies on top (<code>z-index: 4</code>) and its
						wrapper is clipped away dynamically:
					</p>
					<ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
						<li style={{ marginBottom: '8px' }}>
							<strong>next:</strong>{' '}
							<code>clip-path: inset(0 100% 0 0)</code> → right
							edge moves to the left.
						</li>
						<li style={{ marginBottom: '8px' }}>
							<strong>prev:</strong>{' '}
							<code>clip-path: inset(0 0 0 100%)</code> → left
							edge moves to the right.
						</li>
					</ul>
					<p>
						<code>useSlider</code> acts as a compact state machine (
						<code>idle → shutter running → idle</code>). Input from
						arrows, dots, swipe, and autoplay is ignored while a
						shutter animation is running, preventing state
						desynchronization.
					</p>
				</section>

				{/* Section 4 */}
				<section style={cardStyle}>
					<h2 style={headingStyle}>
						4. <code>&lt;HeroSlider /&gt;</code> Props Reference
					</h2>
					<p>Customize behavior directly via component props:</p>
					<table style={tableStyle}>
						<thead>
							<tr>
								<th style={thTdStyle}>Prop</th>
								<th style={thTdStyle}>Type</th>
								<th style={thTdStyle}>Default</th>
								<th style={thTdStyle}>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={thTdStyle}>
									<code>slides</code>
								</td>
								<td style={thTdStyle}>
									<code>SlideData[]</code>
								</td>
								<td style={thTdStyle}>–</td>
								<td style={thTdStyle}>
									Slides to render (required).
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>autoplay</code>
								</td>
								<td style={thTdStyle}>Boolean</td>
								<td style={thTdStyle}>
									<code>true</code>
								</td>
								<td style={thTdStyle}>
									Automatic slide change.
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>interval</code>
								</td>
								<td style={thTdStyle}>Number</td>
								<td style={thTdStyle}>
									<code>7000</code>
								</td>
								<td style={thTdStyle}>
									Autoplay interval in ms.
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>stopOnHover</code>
								</td>
								<td style={thTdStyle}>Boolean</td>
								<td style={thTdStyle}>
									<code>true</code>
								</td>
								<td style={thTdStyle}>
									Pauses autoplay while mouse is over slider.
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>hideProgress</code>
								</td>
								<td style={thTdStyle}>Boolean</td>
								<td style={thTdStyle}>
									<code>false</code>
								</td>
								<td style={thTdStyle}>
									Hides the top progress bar.
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>hideNavigation</code>
								</td>
								<td style={thTdStyle}>Boolean</td>
								<td style={thTdStyle}>
									<code>false</code>
								</td>
								<td style={thTdStyle}>
									Hides the prev/next arrows.
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>hidePagination</code>
								</td>
								<td style={thTdStyle}>Boolean</td>
								<td style={thTdStyle}>
									<code>false</code>
								</td>
								<td style={thTdStyle}>
									Hides the pagination dots.
								</td>
							</tr>
							<tr>
								<td style={thTdStyle}>
									<code>shutterDuration</code>
								</td>
								<td style={thTdStyle}>Number</td>
								<td style={thTdStyle}>
									<code>1500</code>
								</td>
								<td style={thTdStyle}>
									Duration of shutter in ms (JS timer + CSS).
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				{/* Section 5 */}
				<section style={cardStyle}>
					<h2 style={headingStyle}>5. Changelog & Recent Updates</h2>
					<p>
						<strong>v2.3.0 (2026-11-10)</strong>
					</p>
					<ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
						<li>
							<strong>Fixed – Horizontal scrollbar:</strong>{' '}
							<code>width: 100vw</code> (includes scrollbar)
							replaced with <code>width: 100%</code>.
						</li>
						<li>
							<strong>Fixed – Mobile viewport height:</strong>{' '}
							Uses <code>100svh</code> (with <code>100vh</code>{' '}
							fallback), avoiding jumpiness with collapsing
							address bars.
						</li>
						<li>
							<strong>Improved – Accessibility:</strong> Hidden
							slides are marked as <code>inert</code> (links no
							longer receive keyboard focus).
						</li>
						<li>
							<strong>Improved – Reduced motion:</strong> New hook{' '}
							<code>usePrefersReducedMotion</code>; when enabled,
							slides change instantly without shutter, parallax,
							or text animation.
						</li>
					</ul>

					<p>
						<strong>v2.2.0 (2026-11-10)</strong>
					</p>
					<ul style={{ paddingLeft: '20px' }}>
						<li>
							Initial React port of the vanilla slider (Vite,
							plain JSX, central <code>types/slider.ts</code>).
						</li>
						<li>
							Shutter reveal via <code>clip-path</code> in both
							directions, autoplay with progress bar, and hover
							pausing.
						</li>
						<li>
							Touch swipe and mouse drag via Pointer Events,
							locked during active shutter states.
						</li>
					</ul>
				</section>

				{/* Section 6: Demo Images */}
				<section style={cardStyle}>
					<h2 style={headingStyle}>6. 🖼️ Demo Images</h2>
					<p>
						The slide images in <code>public/images</code> (
						<code>img1.jpg</code> – <code>img6.jpg</code>) were
						generated with Google Gemini and are included for
						demonstration purposes only. They are not part of the
						MIT-licensed source code. Please replace them with your
						own images for production use.
					</p>
				</section>

				{/* Section 7: License */}
				<section style={cardStyle}>
					<h2 style={headingStyle}>7. 📜 License</h2>
					<p>
						This project is open-source and available under the{' '}
						<strong>MIT License</strong>.
					</p>
				</section>

				<footer
					style={{
						marginTop: '60px',
						textAlign: 'center',
						color: '#a1a1aa',
						fontSize: '0.9rem',
					}}
				>
					<p>
						&copy; 2026 WebDevGLa. All Rights Reserved. Created with
						❤️ by <strong>WebDevGLa</strong>
					</p>
				</footer>
			</div>
		</div>
	);
}
