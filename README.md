# Gla Shutter Hero Slider – React `v2.3.0`

A fullscreen hero slider with a cinematic **shutter reveal** (CSS `clip-path`) and scroll **parallax**.
React port of the vanilla "Gla Shutter Hero Slider" – **no third-party libraries** besides React itself (no GSAP, no jQuery, no Tailwind).

- **Shutter:** _next_ reveals the new image from right to left, _prev_ from left to right.
- **Any pagination dot is ONE single shutter** (no rotating through the slides in between).
- Autoplay with progress bar, pause on hover, touch swipe and mouse drag.
- JSON-driven content, typography, 9 alignment positions and button styling per slide.
- Accessible: labeled controls, hidden slides are `inert`, respects `prefers-reduced-motion`.
- Plain JSX components, one single type definition file: `src/types/slider.ts`.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # development server (Vite)
npm run build      # production build
npm run typecheck  # type check of the JSDoc annotations against src/types/slider.ts
```

```jsx
import HeroSlider from './components/HeroSlider/HeroSlider';
import { useSlides } from './hooks/useSlides';

export default function App() {
	const { slides, loading, error } = useSlides('/json/slides.json');

	if (error) return <p>{error.message}</p>;
	if (loading) return <p>Loading …</p>;

	return <HeroSlider slides={slides} autoplay interval={7000} />;
}
```

---

## 📁 Project Structure

```
public/
  json/slides.json                 central data source for all slides
  images/                          slide images + logo
src/
  types/slider.ts                  ALL types (data, state, hooks, props)
  hooks/
    useSlider.js                   state machine (reducer) + autoplay
    useSlides.js                   loads slides.json
    usePrefersReducedMotion.js     OS setting "reduce motion"
  components/HeroSlider/
    HeroSlider.jsx                 container: parallax, swipe, hover pause
    SlideItem.jsx
    SliderArrows.jsx
    SliderPagination.jsx
    slideStyle.js                  per-slide CSS variables (fonts, buttons)
    HeroSlider.css
  App.jsx / App.css                demo page (not part of the component)
```

---

## ⚙️ `<HeroSlider />` Props

| Prop              | Type        | Default | Description                                                        |
| :---------------- | :---------- | :------ | :----------------------------------------------------------------- |
| `slides`          | `SlideData[]` | –     | Slides to render (required).                                       |
| `autoplay`        | `boolean`   | `true`  | Automatic slide change.                                            |
| `interval`        | `number`    | `7000`  | Autoplay interval in ms.                                           |
| `stopOnHover`     | `boolean`   | `true`  | Pauses autoplay while the mouse is over the slider.                |
| `hideProgress`    | `boolean`   | `false` | Hides the top progress bar.                                        |
| `hideNavigation`  | `boolean`   | `false` | Hides the prev/next arrows.                                        |
| `hidePagination`  | `boolean`   | `false` | Hides the pagination dots.                                         |
| `shutterDuration` | `number`    | `1500`  | Duration of the shutter in ms (single source: JS timer + CSS).     |

Slide fields (`SlideData`) are identical to the vanilla `slides.json`: `showContent`, `alignment`
(`top|center|bottom` + `-left|center|right`), `imageUrl`, author/title/topic texts with color, size and font family,
`description`, and `button1…` / `button2…` (text, url, colors, hover colors, radius, outline).
See `src/types/slider.ts` for the complete definition.

> Text fields are rendered as **text** (not HTML). In the vanilla version they were injected as HTML.

---

## 🧠 How it works

All slides stay mounted. The outgoing slide lies on top (`z-index: 4`) and its wrapper is clipped away:

- **next:** `clip-path: inset(0 100% 0 0)` → right edge moves to the left
- **prev:** `clip-path: inset(0 0 0 100%)` → left edge moves to the right

`useSlider` is a small state machine (`idle → shutter running → idle`). Input from arrows, dots, swipe and autoplay is
ignored while a shutter is running, so the state can never desynchronize.

---

## 🔄 Changelog

### v2.3.0 (2026-11-10)

- **Fixed – Horizontal scrollbar:** `width: 100vw` (includes the scrollbar) replaced with `width: 100%`.
- **Fixed – Mobile viewport height:** uses `100svh` (with `100vh` fallback), no more jumping with the collapsing address bar.
- **Improved – Accessibility:** hidden slides are `inert` (links no longer receive keyboard focus).
- **Improved – Reduced motion:** new hook `usePrefersReducedMotion`; with "reduce motion" the slide changes instantly without shutter, parallax or text animation.
- Version bumped to 2.3.0 (aligned with the vanilla package).

### v2.2.0 (2026-11-10)

- Initial React port of the vanilla slider (Vite, plain JSX, one `types/slider.ts`, no third-party libraries).
- Shutter via `clip-path` in both directions, autoplay with progress bar, pause on hover.
- Touch swipe and mouse drag via Pointer Events, locked while a shutter is running.
- Any pagination dot triggers one single shutter.
- Parallax without re-renders (CSS variable written directly to the DOM).
- Text animation of the new slide starts after the shutter (consistent for next and prev).

---

## 🖼️ Demo Images

The slide images in `public/images` (`img1.jpg` – `img6.jpg`) were generated with Google Gemini and are included for demonstration purposes only. They are not part of the MIT-licensed source code. Please replace them with your own images for production use.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

\*Created with ❤️ by **WebDevGLa\***
