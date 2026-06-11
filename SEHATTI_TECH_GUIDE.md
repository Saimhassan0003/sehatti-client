# Sehatti Website — Complete Technical Guide
**Version:** 1.0  
**Date:** June 2025  
**Prepared for:** Sehatti Team

---

## 1. TECH STACK OVERVIEW

### Architecture
```
Type:         100% Static Website (Single Page Application)
Database:     NONE — Zero backend, zero database
Server-side:  NONE — No PHP, Node.js, Python, or any backend language
Files:        1 single file → index.html (all CSS + HTML + JavaScript inline)
File size:    ~295 KB (uncompressed)
```

### Languages Used
| Layer        | Technology       | Version   | Purpose                          |
|--------------|------------------|-----------|----------------------------------|
| Structure    | HTML5            | HTML 5.3  | Page markup & semantic sections  |
| Styling      | CSS3             | Modern    | All layout, animations, design   |
| Logic        | Vanilla JavaScript | ES2020+ | Interactions, chatbot, slider    |
| No framework | —                | —         | No React, Vue, Angular, etc.     |

### External Libraries (loaded via CDN — no install needed)
| Library          | Version  | CDN URL                                                      | Purpose                    |
|------------------|----------|--------------------------------------------------------------|----------------------------|
| Font Awesome     | 6.5.0    | cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0    | All icons throughout site  |
| Google Fonts     | Latest   | fonts.googleapis.com                                         | Inter + Noto Kufi Arabic   |

### Fonts Used
| Font              | Weights          | Language   |
|-------------------|------------------|------------|
| Inter             | 300,400,500,600,700,800 | English (LTR) |
| Noto Kufi Arabic  | 300,400,500,600,700,800 | Arabic (RTL)  |

---

## 2. DATABASE — NONE

This website uses **NO database whatsoever**.

| Feature              | How it works                                      |
|----------------------|---------------------------------------------------|
| Contact Form         | Front-end validation only, no data stored         |
| Noor Chatbot         | All Q&A hardcoded in JavaScript KB object         |
| Expert profiles      | Hardcoded HTML                                    |
| Testimonials         | Hardcoded HTML                                    |
| Solutions content    | Hardcoded HTML                                    |

> ⚠️ **Important:** The contact form currently shows a success message but does NOT actually send any email or save any data. To make it functional, you will need to integrate a form service (see Section 6 below).

---

## 3. ALL ASSETS USED

### 3.1 Images hosted on Genspark CDN
These URLs are active while your Genspark project is live. **Download and re-host them yourself for production.**

| File ID      | Description                        | Used In                        |
|--------------|------------------------------------|--------------------------------|
| FFuc4nh6     | Sehatti Logo (white/dark)          | Navbar, Hero, Footer           |
| 83AzKw4p     | Hero background photo (team)       | Hero section background        |
| 6XL7lznF     | Ecosystem card 1 — Assess app      | Ecosystem section              |
| R0eSlIxi     | Ecosystem card 2 — Measure app     | Ecosystem section              |
| QfBtrLnE     | Ecosystem card 3 — Support app     | Ecosystem section              |
| NNtDi06r     | Beth Clay photo                    | Expert card 1                  |
| wjDg1Z19     | Dr. Omneya Omar photo              | Expert card 2                  |
| ErTwLr2D     | Daniela Nistor photo               | Expert card 3                  |
| 6U31AoQd     | Kareem Shawky photo                | Expert card 4                  |
| Bj3b7AJm     | Mostafa Nassef photo               | Expert card 5                  |
| rwT4eK8F     | Gayu Lewis photo                   | Expert card 6                  |
| QW8diDYZ     | Dr. Wael photo                     | Expert card 7                  |
| DRvnnCyp     | Yasmeen Hamada photo               | Expert card 8                  |
| 5cAFnQyu     | Dr. Bassem Farhat photo            | Expert card 9                  |
| 3GKdhlbG     | Mostafa Mersal photo               | Expert card 10                 |
| 1Takt0WP     | Ibrahim Merie photo                | Expert card 11                 |
| T2l9deiA     | GT (Gulf Tainer) logo              | Partner logos marquee          |
| RvMnFBWS     | GODO logo                          | Partner logos marquee          |
| IHM0v73M     | Eurodar logo                       | Partner logos marquee          |
| ZAXoqDgs     | PSI logo                           | Partner logos marquee          |

**Download URL pattern:**
```
https://www.genspark.ai/api/files/s/{FILE_ID}
```

### 3.2 Images from Unsplash (free, no attribution required for commercial use)
| URL                                                                           | Used In                    |
|-------------------------------------------------------------------------------|----------------------------|
| images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80             | Contact section background |
| images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80             | Brand video poster         |

### 3.3 Videos
| Placeholder             | Description                     | Status          |
|-------------------------|---------------------------------|-----------------|
| YOUR_VIDEO_URL_HERE.mp4 | Sehatti brand video             | ⚠️ NOT SET — replace with real video URL |

### 3.4 Icons
All icons are from **Font Awesome Free 6.5.0** — loaded via CDN, no files to download.

---

## 4. HOSTING OPTIONS & REQUIREMENTS

### ✅ Option A — Netlify (RECOMMENDED — Free)
**Best for: Quick deployment, free SSL, global CDN**

**Requirements:**
- Browser only (no software to install)
- Free account at netlify.com

**Steps:**
```
1. Go to https://www.netlify.com
2. Sign up free
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the folder containing index.html
5. Done — live in 30 seconds
6. Custom domain: Site settings → Domain management → Add custom domain
```

**Cost:** Free for basic hosting. Custom domain ~$15/year.

---

### ✅ Option B — Vercel (RECOMMENDED — Free)
**Best for: Fast global CDN, easy GitHub integration**

**Requirements:**
- Free account at vercel.com
- Optional: GitHub account for auto-deploy

**Steps:**
```
1. Go to https://vercel.com
2. Sign up free
3. Click "Add New Project"
4. Upload folder OR connect GitHub repo
5. Deploy — live in under 1 minute
```

**Cost:** Free. Custom domain free with Vercel.

---

### ✅ Option C — GitHub Pages (Free)
**Best for: Developers comfortable with Git**

**Requirements:**
- Free GitHub account
- Git installed (version 2.x+)

**Steps:**
```
1. Create new repository on github.com
2. Upload index.html to the repo
3. Go to Settings → Pages
4. Source: Deploy from branch → main → / (root)
5. Your site is live at: https://yourusername.github.io/repo-name
```

**Cost:** Free. Custom domain: add CNAME file.

---

### ✅ Option D — Traditional Web Hosting / cPanel
**Best for: Existing hosting plans (GoDaddy, Namecheap, SiteGround, Bluehost, etc.)**

**Requirements:**
- Any web hosting plan (even cheapest shared hosting works)
- FTP client (FileZilla — free) OR cPanel File Manager

**Minimum server requirements:**
```
Web server:     Apache 2.4+ OR Nginx 1.18+  (any version works)
PHP:            NOT REQUIRED
Database:       NOT REQUIRED (no MySQL, no PostgreSQL)
SSL:            Recommended (Let's Encrypt — free via cPanel)
Disk space:     1 MB minimum (file is ~295 KB)
Bandwidth:      Any plan works
```

**Steps via cPanel:**
```
1. Log into cPanel
2. Open File Manager
3. Navigate to public_html folder
4. Upload index.html
5. Done — access via yourdomain.com
```

**Steps via FTP (FileZilla):**
```
1. Download FileZilla: https://filezilla-project.org
2. Connect: Host=yourdomain.com, Username=cpanel-user, Password=cpanel-pass, Port=21
3. Navigate to /public_html/
4. Drag index.html from local panel to remote panel
5. Done
```

---

### ✅ Option E — AWS S3 Static Hosting
**Best for: Enterprise-grade, scalable**

**Requirements:**
- AWS account
- AWS CLI (optional)

**Steps:**
```
1. Create S3 bucket named: yourdomain.com
2. Enable "Static website hosting" in bucket properties
3. Set index document: index.html
4. Upload index.html
5. Set bucket policy to public read
6. Optionally add CloudFront CDN for HTTPS + speed
```

**Cost:** ~$0.50–$2/month for small traffic. SSL via CloudFront: free.

---

## 5. DOMAIN & SSL SETUP

### For any hosting provider:
```
DNS Record Type:  A Record  (or CNAME for subdomain)
Points to:        Your hosting provider's IP address
TTL:              3600 (1 hour) or Auto

SSL Certificate:  Let's Encrypt (free)
                  Available in cPanel → SSL/TLS → Let's Encrypt
                  OR automatic on Netlify/Vercel
```

---

## 6. MAKING THE CONTACT FORM FUNCTIONAL

The contact form currently has front-end validation but **does not send emails**.  
Choose one of these free/cheap options:

### Option A — Formspree (Easiest — Free)
```
1. Sign up at formspree.io
2. Create a new form → get your endpoint URL
3. In index.html, find the <form> tag (id="contactForm")
4. Add: action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
5. Remove the JavaScript form submission handler
6. Responses go to your email inbox automatically
```
**Cost:** Free for 50 submissions/month. Paid from $10/month for unlimited.

### Option B — EmailJS (No backend needed)
```
1. Sign up at emailjs.com
2. Connect your Gmail or Outlook
3. Add EmailJS SDK to index.html
4. Configure the form to call emailjs.send()
```
**Cost:** Free for 200 emails/month.

### Option C — Netlify Forms (If hosting on Netlify)
```
1. Add attribute: netlify to your <form> tag
2. Deploy to Netlify
3. Done — form submissions appear in Netlify dashboard
```
**Cost:** Free for 100 submissions/month.

---

## 7. PERFORMANCE NOTES

| Metric              | Status    | Notes                                      |
|---------------------|-----------|--------------------------------------------|
| Page size           | ~295 KB   | Single HTML file, no external JS files     |
| External requests   | ~3        | Fonts, Font Awesome CDN only               |
| Images              | Lazy loaded | All non-critical images load on scroll   |
| JavaScript          | Vanilla   | No framework overhead, fast execution      |
| CSS                 | Inline    | Zero render-blocking stylesheets           |
| Mobile              | Responsive | Works on all screen sizes                 |
| Browser support     | Modern    | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |

---

## 8. FILE STRUCTURE (Current)

```
sehatti-website/
└── index.html          ← ENTIRE website (HTML + CSS + JS, all inline)
```

### Recommended production structure (after downloading assets):
```
sehatti-website/
├── index.html
├── images/
│   ├── logo.png                  ← FFuc4nh6
│   ├── hero-bg.jpg               ← 83AzKw4p
│   ├── ecosystem-assess.jpg      ← 6XL7lznF
│   ├── ecosystem-measure.jpg     ← R0eSlIxi
│   ├── ecosystem-support.jpg     ← QfBtrLnE
│   ├── experts/
│   │   ├── beth-clay.jpg         ← NNtDi06r
│   │   ├── omneya-omar.jpg       ← wjDg1Z19
│   │   ├── daniela-nistor.jpg    ← ErTwLr2D
│   │   ├── kareem-shawky.jpg     ← 6U31AoQd
│   │   ├── mostafa-nassef.jpg    ← Bj3b7AJm
│   │   ├── gayu-lewis.jpg        ← rwT4eK8F
│   │   ├── dr-wael.jpg           ← QW8diDYZ
│   │   ├── yasmeen-hamada.jpg    ← DRvnnCyp
│   │   ├── bassem-farhat.jpg     ← 5cAFnQyu
│   │   ├── mostafa-mersal.jpg    ← 3GKdhlbG
│   │   └── ibrahim-merie.jpg     ← 1Takt0WP
│   └── logos/
│       ├── gulf-tainer.png       ← T2l9deiA
│       ├── godo.png              ← RvMnFBWS
│       ├── eurodar.png           ← IHM0v73M
│       └── psi.png               ← ZAXoqDgs
└── videos/
    └── brand-video.mp4           ← ADD YOUR OWN
```

---

## 9. HOW TO UPDATE CONTENT

Since everything is in one HTML file, all edits are simple text changes:

| What to change          | Search for in index.html                    |
|-------------------------|---------------------------------------------|
| Phone number            | `+971 58 650 7828`                          |
| Email address           | `info@sehatti.com`                          |
| Office address          | `Tecom, Dubai, UAE`                         |
| Hero tagline            | `Where People Thrive`                       |
| Expert names/titles     | `expert-card__name`                         |
| Testimonials            | `trust__t-text`                             |
| Chatbot Q&A             | `const KB = {` in the Noor Script section  |
| Footer copyright year   | `© 2025 Sehatti`                           |
| Social media links      | `linkedin.com/company/sehatti-dubai`        |
| Brand video URL         | `YOUR_VIDEO_URL_HERE.mp4`                   |

---

## 10. QUICK DEPLOYMENT CHECKLIST

```
Before going live:
□ Download all images from Genspark CDN (see Section 3.1)
□ Update all image src= paths to local paths
□ Add real brand video URL (replace YOUR_VIDEO_URL_HERE.mp4)
□ Set up contact form service (Formspree / EmailJS / Netlify Forms)
□ Test on mobile (iOS Safari + Android Chrome)
□ Add Google Analytics or similar tracking if needed
□ Set up SSL certificate (HTTPS)
□ Register/point your domain
□ Test all links (navbar, CTAs, social icons)
□ Test Noor chatbot in both English and Arabic
```

---

*Document prepared by Genspark AI — Sehatti Website Project*
