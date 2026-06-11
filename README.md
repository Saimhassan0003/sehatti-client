# Sehatti — Corporate Wellness Website

> Single-file static website for **Sehatti**, a science-backed corporate wellbeing platform serving organisations across the GCC.

---

## 🗂️ Project Files

| File | Size | Description |
|---|---|---|
| `index.html` | ~290 KB | **Complete website** — all HTML, CSS, JS inline |
| `SEHATTI_TECH_GUIDE.md` | 14 KB | Full tech stack + 5-option hosting guide |
| `assets/BUILD_YOUR_ZIP.html` | 24 KB | **Browser-based ZIP packager** — builds downloadable project ZIP |
| `assets/DOWNLOAD_ASSETS.html` | 18 KB | Visual image download center (thumbnails + save-as paths) |
| `assets/LOCAL_PATHS_PATCH.md` | 2 KB | 22-entry find/replace map: CDN URLs → local image paths |
| `assets/images/contact-bg.jpg` | 308 KB | Contact section background (Unsplash) |
| `assets/images/brand-video-poster.jpg` | 145 KB | Brand video poster (Unsplash) |

---

## 🧱 Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| HTML | HTML5 | Semantic tags, single `index.html` |
| CSS | CSS3 (inline) | Custom properties, Flexbox, Grid, scroll-reveal |
| JavaScript | Vanilla ES6+ | No framework, no bundler, no build step |
| Icons | Font Awesome 6.5.0 | via jsDelivr CDN |
| Fonts | Google Fonts | Inter (EN) + Noto Kufi Arabic (AR) |
| **Database** | **NONE** | Fully static — no DB, no backend, no server |
| Chatbot | JS hardcoded KB | 40 Q&As in `KB` object inside `index.html` |
| Contact Form | Front-end only | Needs Formspree/EmailJS for actual email sending |

**Zero dependencies to install. Zero build steps. Zero backend.**

---

## ✅ Completed Features

- [x] Full single-page website (Hero, About, Pillars, Ecosystem, Experts, Trust, Contact)
- [x] Bilingual **Noor chatbot** (EN/AR) — floating bubble, 2-level category navigation, 20 Q&As each language
- [x] Auto-welcome popup (3s after page load, click to open chat)
- [x] RTL/LTR bidirectional text support (Arabic ↔ English)
- [x] Scroll-reveal animations (Intersection Observer)
- [x] Responsive layout (mobile/tablet/desktop)
- [x] "About" navbar → links to `#brand-video` section
- [x] All em-dashes removed site-wide
- [x] Tech guide + hosting documentation
- [x] Browser-based ZIP packager (`assets/BUILD_YOUR_ZIP.html`)
- [x] Local asset patch map (`assets/LOCAL_PATHS_PATCH.md`)

---

## 🚀 How to Host (Quick Start)

**No server software required.** This is a static HTML file.

### Option 1 — Netlify (easiest, free)
1. Go to [netlify.com](https://netlify.com) → Sign up → New site
2. Drag & drop your project folder into the deploy zone
3. Live instantly at `*.netlify.app`

### Option 2 — GitHub Pages (free)
1. Create a GitHub repository
2. Upload `index.html` + `assets/` folder
3. Settings → Pages → Source: `main` branch, `/root`
4. Live at `https://username.github.io/repo-name`

### Option 3 — cPanel / Shared Hosting
1. Login → File Manager → `public_html/`
2. Upload all files keeping the folder structure
3. Visit your domain — done

### Option 4 — Vercel
1. [vercel.com](https://vercel.com) → Add New Project → upload folder
2. Framework: `Other (static)` → Deploy

### Option 5 — AWS S3
1. Create S3 bucket → Enable "Static website hosting"
2. Set `index.html` as index document → make bucket public
3. Upload all files → optional: add CloudFront CDN

---

## 📦 Getting the ZIP / All Assets

**→ Open `assets/BUILD_YOUR_ZIP.html` in your browser**

This page will:
1. Fetch `index.html` + all guide files automatically
2. Attempt to download all images (Genspark CDN images may need manual save)
3. Package everything into `sehatti-project.zip` and download it

**For images that can't be auto-fetched** (Genspark CDN uses HTTP 302 redirects):
- Open `assets/DOWNLOAD_ASSETS.html` → right-click each thumbnail → Save image as
- Save to the path shown (e.g. `assets/images/logo.png`)
- Then apply `assets/LOCAL_PATHS_PATCH.md` find/replace in `index.html`

---

## 🖼️ Image Assets (22 total)

| File | CDN ID | Status |
|---|---|---|
| `images/logo.png` | `FFuc4nh6` | Manual download needed |
| `images/hero-bg.jpg` | `83AzKw4p` | Manual download needed |
| `images/ecosystem-assess.jpg` | `6XL7lznF` | Manual download needed |
| `images/ecosystem-measure.jpg` | `R0eSlIxi` | Manual download needed |
| `images/ecosystem-support.jpg` | `QfBtrLnE` | Manual download needed |
| `images/experts/beth-clay.jpg` | `NNtDi06r` | Manual download needed |
| `images/experts/omneya-omar.jpg` | `wjDg1Z19` | Manual download needed |
| `images/experts/daniela-nistor.jpg` | `ErTwLr2D` | Manual download needed |
| `images/experts/kareem-shawky.jpg` | `6U31AoQd` | Manual download needed |
| `images/experts/mostafa-nassef.jpg` | `Bj3b7AJm` | Manual download needed |
| `images/experts/gayu-lewis.jpg` | `rwT4eK8F` | Manual download needed |
| `images/experts/dr-wael.jpg` | `QW8diDYZ` | Manual download needed |
| `images/experts/yasmeen-hamada.jpg` | `DRvnnCyp` | Manual download needed |
| `images/experts/bassem-farhat.jpg` | `5cAFnQyu` | Manual download needed |
| `images/experts/mostafa-mersal.jpg` | `3GKdhlbG` | Manual download needed |
| `images/experts/ibrahim-merie.jpg` | `1Takt0WP` | Manual download needed |
| `images/logos/gulf-tainer.png` | `T2l9deiA` | Manual download needed |
| `images/logos/godo.png` | `RvMnFBWS` | Manual download needed |
| `images/logos/eurodar.png` | `IHM0v73M` | Manual download needed |
| `images/logos/psi.png` | `ZAXoqDgs` | Manual download needed |
| `images/contact-bg.jpg` | Unsplash | ✅ Downloaded |
| `images/brand-video-poster.jpg` | Unsplash | ✅ Downloaded |

All CDN images are at: `https://www.genspark.ai/api/files/s/{ID}`

---

## ⏳ Pending / Not Yet Implemented

- [ ] **Brand video** — `YOUR_VIDEO_URL_HERE.mp4` placeholder in `index.html` — needs real video
- [ ] **Contact form email** — front-end validation only; needs [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com) for actual delivery
- [ ] **Local images** — Genspark CDN images need manual download (see `assets/DOWNLOAD_ASSETS.html`)

---

## 🔗 Entry Points

| URL | Description |
|---|---|
| `/` or `index.html` | Full website |
| `#brand-video` | About / Who We Are section |
| `#pillars` | Three Pillars section |
| `#ecosystem` | Ecosystem (Assess / Measure / Support) |
| `#experts` | Expert team section |
| `#contact` | Contact form |
| `assets/BUILD_YOUR_ZIP.html` | **Project ZIP packager** |
| `assets/DOWNLOAD_ASSETS.html` | Image download center |

---

## 📋 Chatbot Architecture

```
Noor Chatbot (index.html — inline JS)
├── KB object (bilingual EN + AR)
│   ├── 5 categories × 4 questions (EN) = 20 Q&As
│   └── 5 categories × 4 questions (AR) = 20 Q&As
├── findAnswerById(id)     — exact match for button clicks
├── findAnswerByKeyword(t) — keyword scoring for typed input
├── buildQuickReplies()    — 2-level category → questions menu
└── Auto-welcome popup     — setTimeout 3000ms after page load
```

---

*Built with HTML5 + CSS3 + Vanilla JS. No database. No backend. No build tools.*
