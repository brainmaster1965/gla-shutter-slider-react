================================================================================
GLA SHUTTER HERO SLIDER - REACT
================================================================================
Version: 2.3.0
Author: WebDevGLa
License: MIT License (see LICENSE)

DESCRIPTION:
--------------------------------------------------------------------------------
Gla Shutter Hero Slider (React) is a modern fullscreen hero slider component for
React projects built with Vite. It features a unique shutter transition effect
(CSS clip-path), dynamic parallax background scrolling, autoplay with progress
bar, configurable hover pause, touch/mouse drag-to-swipe gestures and full
JSON-driven content & alignment management.

FEATURES:
--------------------------------------------------------------------------------
- Plain JSX components, no third-party libraries besides React itself (No GSAP,
  No jQuery, No Tailwind, No Swiper.js).
- One single type definition file: src/types/slider.ts (JSDoc type checking via
  "npm run typecheck").
- Shutter reveal animation (CSS clip-path): "next" reveals the new image from
  right to left, "prev" from left to right.
- Every pagination dot triggers ONE single shutter (no rotating through the
  slides in between). Input is locked while a shutter is running.
- Fullscreen Hero Layout with responsive mobile image scaling and smooth
  parallax scroll effect (no re-renders).
- Modular Content Visibility: Toggle individual slide elements (author, title,
  topic, description, buttons) on/off per slide via JSON.
- Dynamic 9-Grid Content Placement via JSON alignment (e.g. top-left,
  center-right, bottom-center).
- Multi-Platform Gesture Support: touch-swipe and mouse drag-to-swipe via
  Pointer Events.
- Configurable via props: autoplay, interval, stopOnHover, hideProgress,
  hideNavigation, hidePagination, shutterDuration.
- Accessible by default: labeled controls, hidden slides are inert and the OS
  setting "reduce motion" (prefers-reduced-motion) is respected.

DIRECTORY STRUCTURE:
--------------------------------------------------------------------------------
- public/json/slides.json     -> Central data source for all slides
- public/images/              -> Slide images and logo
- src/types/slider.ts         -> All types (data, state, hooks, props)
- src/hooks/                  -> useSlider, useSlides, usePrefersReducedMotion
- src/components/HeroSlider/  -> HeroSlider, SlideItem, SliderArrows,
                                 SliderPagination, slideStyle.js, HeroSlider.css
- src/App.jsx / App.css       -> Demo page (not part of the component)
- README.md                   -> Full documentation (props, usage, changelog)
- README.txt                  -> Product overview and release notes
- LICENSE                     -> MIT License

QUICK START:
--------------------------------------------------------------------------------
  npm install
  npm run dev          (development server)
  npm run build        (production build)
  npm run typecheck    (type check against src/types/slider.ts)

  import HeroSlider from './components/HeroSlider/HeroSlider';
  import { useSlides } from './hooks/useSlides';

  const { slides } = useSlides('/json/slides.json');
  <HeroSlider slides={slides} autoplay interval={7000} />

CHANGELOG:
--------------------------------------------------------------------------------
### v2.3.0 (2026-11-10)

- **Fixed - Horizontal scrollbar:** width: 100vw (includes the scrollbar) replaced
  with width: 100%.
- **Fixed - Mobile viewport height:** Height uses 100svh (with 100vh fallback), so
  the hero no longer jumps when the mobile address bar collapses.
- **Improved - Accessibility:** Hidden slides are inert (links no longer receive
  keyboard focus).
- **Improved - Reduced motion:** New hook usePrefersReducedMotion. With "reduce
  motion" the slide changes instantly without shutter, parallax or text animation.
- Version bumped to 2.3.0 (aligned with the vanilla package).

v2.2.0 (2026-11-10)
- Initial React port of the vanilla slider (Vite, plain JSX, one types/slider.ts,
  no third-party libraries).
- Shutter via clip-path in both directions, autoplay with progress bar, pause on
  hover.
- Touch swipe and mouse drag via Pointer Events, locked while a shutter is running.
- Any pagination dot triggers one single shutter.
- Parallax without re-renders (CSS variable written directly to the DOM).
- Text animation of the new slide starts after the shutter (consistent for next
  and prev).

NOTE:
--------------------------------------------------------------------------------
Text fields from slides.json are rendered as plain text (not as HTML), unlike in
the vanilla version.

DEMO IMAGES:
--------------------------------------------------------------------------------
The slide images in public/images (img1.jpg - img6.jpg) were generated with Google Gemini and are
included for demonstration purposes only. They are not part of the MIT-licensed
source code. Please replace them with your own images for production use.

SUPPORT & CONTACT:
--------------------------------------------------------------------------------
If you have any questions or need support, please contact WebDevGLa via
our profile page or website.

DOCUMENTATION:
--------------------------------------------------------------------------------
For the full documentation (props, project structure, how it works) please open
README.md.

(c) 2026 WebDevGLa. All rights reserved.
