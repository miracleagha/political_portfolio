# Hon. Blessing Ufedojo Benyeogor (BUB) — Leadership & Public Engagement Website

A sophisticated, responsive, production-quality public leadership platform for Hon. Blessing Ufedojo Benyeogor, built with HTML5, Bootstrap 5.3, custom CSS and vanilla JavaScript.

---

## 1. Project structure

```
.
├── index.html                 # Home — all 14 required sections
├── about.html                 # Biography, vision, core values
├── agenda.html                # All 11 agenda priorities expanded
├── news.html                  # News & Updates listing (filterable)
├── gallery.html               # Media Gallery (filter + accessible modal viewer)
├── volunteer.html             # Join the Movement — full form + FAQ
├── contact.html               # Contact details + optional message form
├── community-voices.html      # Grouped voices (youth, women, leaders, professionals)
├── press.html                 # Press releases, statements, media resources
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css          # Full design system, components, responsive rules
│   ├── js/
│   │   └── main.js            # Navbar, counters, gallery filter, modal, forms
│   └── img/
│       └── placeholders/      # SVG placeholders (portrait, community, gallery, news, etc.)
└── includes/
    ├── header.html            # Reference copy of the shared navbar markup
    └── footer.html            # Reference copy of the shared footer markup
```

The site is static (no backend). The identical navbar/footer markup is inlined into every page for maximum portability. The `includes/` reference copies make it straightforward to migrate later to PHP includes if a backend is adopted.

---

## 2. Running locally

Any static web server works. Pick one of the options below.

### Option A — PowerShell (no dependencies if Python is installed)

```powershell
# From the project root
python -m http.server 5500
```

Then open http://localhost:5500 in a browser.

### Option B — VS Code "Live Server" extension

Right-click `index.html` → **Open with Live Server**.

### Option C — Node.js (if available)

```powershell
npx serve .
```

> You can also open `index.html` directly in a browser via the file system, but Bootstrap and Google Fonts load from CDNs so an internet connection is required for full styling.

---

## 3. Technology

- **HTML5** semantic markup
- **Bootstrap 5.3** (via CDN) — grid, navbar, forms, carousel, modal, accordion, pagination
- **Bootstrap Icons 1.11** — consistent line iconography
- **Google Fonts** — Montserrat (headings), Nunito (body), Bricolage Grotesque (optional editorial accents)
- **Custom CSS** — in `assets/css/style.css` (design tokens, marker underline, bento grid, waves, texture, cards)
- **Vanilla JavaScript** — in `assets/js/main.js` (no framework)

The CSS uses CSS custom properties for all colours, spacing, radii, shadows and typography so the design system can be tuned in one place.

---

## 4. Design system reference

Core tokens (defined at the top of `assets/css/style.css`):

| Token | Value |
|---|---|
| `--navy` | `#004A8F` |
| `--yellow` | `#FCD53F` |
| `--green` | `#28A745` |
| `--light-blue` | `#E6F0F9` |
| `--neutral-bg` | `#F4F7FA` |
| `--paper-grey` | `#F2F3F5` |
| `--teal` / `--deep-teal` / `--teal-tint` | `#0F9D8F` / `#0B7D72` / `#E7F5F1` |
| `--apricot` | `#FB923C` |
| `--charcoal` | `#17181C` |
| `--text-secondary` | `#5B5E68` |

Signature components implemented:

- `.marker-underline` — yellow marker highlight behind selected words (uses a `::before` pseudo-element with `-2deg` rotation).
- Layered SVG wave transitions (green/yellow/navy) under the hero and all page headers.
- Dotted paper texture (`.bg-dots`) on light sections, created with a CSS radial-gradient (no raster image).
- Rounded cards (`.card-plain`, `.news-card`, `.quote-card`, `.contact-card`) with subtle borders, selective shadows and hover-lift transitions.
- Bento-inspired impact grid (`.bento-grid .bento-impact`) with mixed-span cells on desktop and clean single-column stack on mobile.
- Pill eyebrow labels, icon chips (navy / yellow / green / teal / apricot variants), and a soft identity badge on the hero.

---

## 5. Interactive behaviour

Everything is implemented in `assets/js/main.js`:

- **Sticky navbar** with a scroll-state style (`.is-scrolled`) once the user scrolls past 10px.
- **Active page highlight** — the current `.nav-link` is marked `active` based on `window.location.pathname`.
- **Smooth anchor scrolling** with navbar offset, and automatic closing of the mobile menu.
- **Reveal-on-scroll** — `IntersectionObserver` toggles `.reveal.in` on elements marked `.reveal`.
- **Animated counters** — any element with `data-counter="50"` animates from 0 to the target when it enters the viewport.
- **Gallery filter + modal** — any grid with `data-gallery` and tiles with `data-cat="…"` is filterable; buttons use `data-gallery-filter="…"`. If a `#galleryModal` is present, true gallery tiles become clickable (and keyboard-operable) and open the modal with the enlarged image and caption.
- **Form validation** — any form with `data-bub-form` runs HTML5 validation on submit and shows an informational message in the `.form-status` area. Since no backend is wired up, the status explains that live submission requires an approved integration.
- **Dynamic year** — any `<span data-year>` is set to the current year.
- **Reduced-motion** — all animations, counters, smooth scrolling and reveals are disabled when `prefers-reduced-motion: reduce` is set.

---

## 6. Accessibility

- Skip-to-content link on every page.
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`), descriptive headings, breadcrumb navigation.
- Visible focus states on buttons, nav links, and gallery items.
- Gallery tiles are keyboard-operable (Enter / Space open the modal).
- All meaningful images carry alternative text; decorative SVGs use `aria-hidden="true"`.
- Form inputs have labelled controls, visible required markers, and clear `.invalid-feedback` messages.
- Contrast meets accessible defaults (navy on light, dark text on yellow, white on navy, etc.).
- `prefers-reduced-motion` is honoured.

Full WCAG validation requires manual testing with assistive technologies and an accessibility review.

---

## 7. Content accuracy & placeholder discipline

The following elements are intentionally placeholder:

- Portrait and photographic imagery (replaced with SVG placeholders labelled as such).
- News titles, dates and excerpts.
- Testimonials and attributed quotations.
- Impact statistics (shown with a visible "Illustrative" badge on each stat tile).
- Contact details (office, phone, email, WhatsApp).
- Social media URLs.
- Privacy policy and Terms link destinations.

No real campaign facts, affiliations, electoral numbers, achievements or endorsements are fabricated anywhere on the site. Each page carries at least one visible `privacy-note` explaining what is pending.

---

## 8. Still required (integration & content checklist)

Before taking the site live, the campaign team must supply:

### Content

- [ ] Approved portrait photograph of Hon. Blessing Ufedojo Benyeogor
- [ ] Approved community engagement photography (youth, women, outreach, stakeholders, town halls, press)
- [ ] Verified biography (education, experience, roles, awards)
- [ ] Verified impact statistics (community visits, meetings, residents engaged, volunteers) — or confirmation to omit until later
- [ ] Approved press releases, statements, interviews with dates
- [ ] Verified community voices with speaker consent and attribution
- [ ] Final privacy policy and terms text

### Contact details (replace all "pending" placeholders)

- [ ] Campaign office address
- [ ] Phone number — update `tel:` link in `contact.html`
- [ ] Email address — update `mailto:` link in `contact.html`
- [ ] WhatsApp number — construct `https://wa.me/<number>` link
- [ ] Official social URLs (Facebook, Instagram, X, TikTok, YouTube) — replace `#` hrefs

### Backend integrations (optional, choose per channel)

The site currently has no server. To accept real form submissions choose one of:

- **Email forwarder** (simplest): point each `<form>` `action` at a service like Formspree, Formcarry or Basin. Add `method="POST"`. Remove the "no backend" status message in `main.js`.
- **PHP endpoint**: create `/api/volunteer.php` and `/api/contact.php` that validate server-side, use prepared statements if persisting to MySQL, apply CSRF protection, and respond with JSON. Update the form `action` and switch `main.js` to use `fetch()` with proper error handling.
- **Serverless function**: AWS Lambda / Cloudflare Workers / Netlify Functions, same contract as above.

Whichever approach is chosen, the submission UI already supports a loading / success / error state via the `.form-status` element.

### Deployment

The site is pure static. Any host works:

- Netlify / Vercel / Cloudflare Pages / GitHub Pages — drag and drop the project folder, no build step.
- Traditional shared hosting — upload the files via FTP/SFTP to the public directory.
- If PHP is later added, use a host that supports PHP 8+ (shared hosting, DigitalOcean, Render, etc.).

Set custom 404 and redirect rules at the host level if required.

---

## 9. Browser support

Tested design targets:

- Latest Chrome, Edge, Firefox, Safari
- iOS Safari 15+, Android Chrome 100+
- Breakpoints: 320, 390, 768, 1024, 1440, large desktop

The site degrades gracefully: if JavaScript fails to load, content remains readable, counters show their final value as plain text, and forms still validate with native HTML5 validation. If Google Fonts fail, the system font stack takes over.

---

## 10. Making changes

- **Add or edit a navigation item** — update it in each page's `<ul class="navbar-nav">` block (or edit `includes/header.html` and re-copy).
- **Change brand colours** — edit the custom properties at the top of `assets/css/style.css`.
- **Add a new agenda item** — duplicate one `.agenda-card` block in `agenda.html` and `index.html`.
- **Add a real news article** — duplicate a news card block in `news.html` and link it to a dedicated article page.
- **Add real gallery images** — drop images into `assets/img/gallery/`, add a tile in `gallery.html` with the correct `data-cat` and `alt`.
- **Enable live form submission** — see §8 above.

---

Built as a frontend-only, production-ready static site. No framework lock-in, no build step, no fabricated facts.
