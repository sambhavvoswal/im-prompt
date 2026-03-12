# 🎨 AI Poster Prompt Gallery — Vibe Coding Blueprint

> **Stack:** MERN (MongoDB · Express · React · Node.js)  
> **AI Coding Tool:** Google Antigravity (free) — agent-first IDE  
> **Model:** Gemini 3 Pro (primary, free) + Claude Sonnet 4.6 (complex UI phases)  
> **Version:** v1.0 — Hardcoded Data, No Admin Dashboard  
> **Future Scope:** Admin Dashboard (v2.0)

---

## 🚀 What is Google Antigravity?

Antigravity is Google's free, agent-first IDE released in November 2025. Unlike Cursor or Copilot which suggest code line-by-line, Antigravity operates on a **task-delegation model** — you describe what to build, the agent plans, codes, runs terminal commands, and verifies in a live browser, all autonomously.

It has two primary surfaces you'll use throughout this project:

**Editor View** — Familiar VS Code-style interface. Use this when you need hands-on control: reviewing diffs, tweaking specific files, fixing logic the agent got wrong.

**Manager View (Mission Control)** — The agent-first dashboard. Use this to spawn agents for full phases: "Build the homepage with these requirements." The agent generates an **Implementation Plan** first (as an Artifact you can annotate like a Google Doc), then executes.

> Download free: [antigravity.google/download](https://antigravity.google/download) — Mac / Windows / Linux

---

## 🤖 Model Strategy (Free Tier)

Antigravity supports multiple models. Use them strategically to stretch your free quota:

| Model | Use For | Free Limit |
|-------|---------|------------|
| **Gemini 3 Pro** | Scaffolding, CRUD routes, seed data, all boilerplate | Most generous — use as primary |
| **Claude Sonnet 4.6** | Complex React components, modal logic, hooks, animations | More limited — save for tricky UI |
| **GPT-OSS** | Fallback if others rate-limit mid-session | Moderate |

**Practical tip:** Switch models per task via the model selector in Manager View. Don't burn Sonnet 4.6 quota writing `.gitignore` or seeding MongoDB — that's Gemini 3 Pro work.

> ⚠️ **Rate limit reality:** Some users hit limits after 20–30 minutes of heavy agent use. If you hit a wall, switch models or commit what you have and continue next session. Always commit after each phase.

---

## 🧠 Antigravity Setup for This Project

### Step 1 — Install & Open Project
```
1. Download Antigravity from antigravity.google/download
2. Sign in with Google account
3. Create new empty project folder: ai-poster-gallery/
4. Open folder in Antigravity — you'll land in Manager View
5. Select "Plan Mode" for complex phases (agent plans before coding)
   Select "Fast Mode" for mechanical/boilerplate phases
```

### Step 2 — Set Up Rules (Persistent System Instructions)
Rules guide the agent across ALL tasks in this workspace automatically.
Go to: `... menu → Customizations → Rules`

Paste this as your Rules:
```
PROJECT: AI Poster Prompt Gallery — MERN stack
STACK: MongoDB + Express + React (Vite) + Node.js
MODULES: ES modules (import/export) throughout — never CommonJS require()
CSS: Tailwind CSS v3 utility classes only — no custom CSS files unless necessary
COMPONENTS: Functional React components with hooks only — no class components
NAMING: camelCase variables/functions, PascalCase components, kebab-case filenames
API: All backend routes prefixed with /api — never /api/v1 in v1.0
ERRORS: Always wrap async ops in try/catch, return proper HTTP status codes
COMMITS: Remind me to commit after every completed phase
MONGO: Mongoose with async/await only — no callbacks
ENV: Never hardcode secrets — always use process.env
STRUCTURE: Keep client/ and server/ strictly separated — no shared folders
MODELS: Use Gemini 3 Pro for boilerplate — I'll switch to Claude Sonnet 4.6 for complex UI
TESTING: After creating any API route, test it in the terminal with curl before moving on
```

### Step 3 — Set Up Workflows (Saved / Shortcuts)
Workflows are triggered with `/` in the agent chat. Go to `Customizations → Workflows` and create these:

**`/new-component`**
```
Create a new React functional component in client/src/components/[path].
Use Tailwind CSS for styling. Include PropTypes or JSDoc types. Export as default.
Show me the file path before writing.
```

**`/api-route`**
```
Create an Express route + controller for [describe endpoint].
Add to server/routes/ and server/controllers/.
Include error handling and proper HTTP status codes.
Test with curl and show me the output before finishing.
```

**`/commit-check`**
```
List all files created or modified in this session.
Write a descriptive git commit message for what was completed.
Print the exact commands: git add . && git commit -m "..."
```

---

## 📐 Project Overview

A **Canva-inspired AI prompt gallery** where visitors browse trending occasion/event tiles, explore curated AI-generated poster images, copy prompts with one click, and compare how the same prompt renders across different AI models.

### Core User Flow
```
Homepage (Trend Tiles)
    └── Click Trend (e.g., "Holi 2025")
            └── Trend Gallery Page (Grid of poster images)
                    └── Click Image → Modal Preview
                            ├── Full prompt with copy button
                            ├── Prompt tags / metadata
                            └── "Compare Models" tab
                                    └── Side-by-side (DALL·E · Midjourney · Flux · SD)
```

---

## 🗂️ Project Structure

```
ai-poster-gallery/
├── client/                         # React frontend (Vite)
│   ├── public/
│   │   └── placeholder-images/     # Static placeholder poster images
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── CopyButton.jsx
│   │   │   │   ├── TagBadge.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── home/
│   │   │   │   ├── TrendCard.jsx
│   │   │   │   ├── TrendGrid.jsx
│   │   │   │   └── HeroBanner.jsx
│   │   │   ├── gallery/
│   │   │   │   ├── PosterCard.jsx
│   │   │   │   ├── PosterGrid.jsx
│   │   │   │   └── FilterBar.jsx
│   │   │   └── modal/
│   │   │       ├── PosterModal.jsx
│   │   │       ├── PromptPanel.jsx
│   │   │       ├── ModelComparison.jsx
│   │   │       └── ModelImageCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── TrendPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── data/
│   │   │   └── hardcoded.js        # Seed data mirror (v1.0 fallback)
│   │   ├── hooks/
│   │   │   ├── useCopyToClipboard.js
│   │   │   └── useModal.js
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Modal state, selected poster
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/                         # Express + Node backend
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Trend.js
│   │   └── Poster.js
│   ├── routes/
│   │   ├── trends.js
│   │   └── posters.js
│   ├── controllers/
│   │   ├── trendsController.js
│   │   └── postersController.js
│   ├── data/
│   │   └── seed.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── index.js
│
├── .antigravity/
│   └── rules.md                    # Auto-loaded by Antigravity agent
├── .env
├── .gitignore
└── package.json                    # Root — concurrently dev script
```

---

## 🧬 MongoDB Schemas

### Trend Schema (`server/models/Trend.js`)
```javascript
{
  slug: String,           // "holi-2025" — used in URL routing
  title: String,          // "Holi 2025 🎨"
  description: String,
  emoji: String,
  coverImage: String,     // URL or /placeholders/ path
  category: String,       // "festival" | "sports" | "news" | "seasonal" | "occasion"
  tags: [String],
  isActive: Boolean,
  isTrending: Boolean,
  posterCount: Number,    // denormalized for display
  createdAt: Date,
  updatedAt: Date
}
```

### Poster Schema (`server/models/Poster.js`)
```javascript
{
  trendId: ObjectId,       // ref: Trend
  title: String,
  prompt: String,          // The full AI prompt — the core value of the app
  negativePrompt: String,
  tags: [String],
  style: String,           // "photorealistic" | "illustration" | "3d" | "watercolor"
  aspectRatio: String,     // "1:1" | "16:9" | "9:16" | "4:5"
  primaryModel: String,    // "midjourney" | "dalle3" | "flux" | "stable-diffusion"
  modelOutputs: [
    {
      model: String,
      imageUrl: String,    // Placeholder image URL for v1.0
      quality: String,     // "high" | "medium"
      renderTime: String,  // "~30s"
      notes: String        // "Best color accuracy"
    }
  ],
  previewImage: String,
  copyCount: Number,
  likes: Number,
  isActive: Boolean,
  createdAt: Date
}
```

---

## 🌱 Hardcoded Seed Data (`client/src/data/hardcoded.js`)

Paste this into the agent during Phase 2:

```javascript
export const TRENDS = [
  {
    id: "holi-2025", slug: "holi-2025", title: "Holi 2025", emoji: "🎨",
    description: "Festival of Colors — vibrant, joyful, cinematic poster prompts",
    category: "festival", tags: ["holi", "colors", "festival", "india", "spring"],
    coverImage: "/placeholders/holi-cover.jpg", isTrending: true, posterCount: 8
  },
  {
    id: "ipl-2025", slug: "ipl-2025", title: "IPL 2025 🏏", emoji: "🏏",
    description: "Cricket fever — stadium energy, team spirit, championship vibes",
    category: "sports", tags: ["ipl", "cricket", "india", "t20", "sports"],
    coverImage: "/placeholders/ipl-cover.jpg", isTrending: true, posterCount: 6
  },
  {
    id: "eid-2025", slug: "eid-2025", title: "Eid Mubarak 2025", emoji: "🌙",
    description: "Elegant, luxurious Eid celebration poster prompts",
    category: "festival", tags: ["eid", "celebration", "moon", "gold"],
    coverImage: "/placeholders/eid-cover.jpg", isTrending: false, posterCount: 5
  },
  {
    id: "mothers-day-2025", slug: "mothers-day-2025", title: "Mother's Day", emoji: "💐",
    description: "Heartfelt, elegant poster prompts for Mother's Day",
    category: "occasion", tags: ["mothers-day", "love", "flowers", "family"],
    coverImage: "/placeholders/mothers-day-cover.jpg", isTrending: false, posterCount: 5
  },
  {
    id: "diwali-2025", slug: "diwali-2025", title: "Diwali 2025 ✨", emoji: "🪔",
    description: "Diyas, fireworks, golden light — festive poster magic",
    category: "festival", tags: ["diwali", "lights", "festival", "india"],
    coverImage: "/placeholders/diwali-cover.jpg", isTrending: false, posterCount: 7
  },
  {
    id: "new-year-2026", slug: "new-year-2026", title: "New Year 2026 🎉", emoji: "🎉",
    description: "Countdown, confetti, fireworks — new year energy",
    category: "seasonal", tags: ["new-year", "celebration", "fireworks"],
    coverImage: "/placeholders/newyear-cover.jpg", isTrending: false, posterCount: 4
  }
];

export const POSTERS = [
  {
    id: "holi-001", trendId: "holi-2025", title: "Cinematic Holi Burst",
    prompt: "A stunning cinematic photograph of a young Indian woman celebrating Holi, surrounded by explosive clouds of vibrant pink, orange, yellow, and turquoise powder. She is laughing with pure joy, arms outstretched, wearing a white kurta now drenched in colors. Golden hour lighting, shallow depth of field, shot on Sony A7IV with 85mm f/1.4 lens. Bokeh background of a blurred crowd celebrating. --ar 4:5 --style raw --v 6.1",
    negativePrompt: "blurry face, overexposed, dark, sad expression, ugly, deformed",
    tags: ["portrait", "cinematic", "golden-hour", "photorealistic"],
    style: "photorealistic", aspectRatio: "4:5", primaryModel: "midjourney",
    previewImage: "/placeholders/holi-001.jpg",
    modelOutputs: [
      { model: "midjourney", imageUrl: "/placeholders/holi-001-mj.jpg", quality: "high", renderTime: "~45s", notes: "Best overall composition" },
      { model: "dalle3", imageUrl: "/placeholders/holi-001-dalle.jpg", quality: "high", renderTime: "~20s", notes: "Great color accuracy" },
      { model: "flux", imageUrl: "/placeholders/holi-001-flux.jpg", quality: "high", renderTime: "~15s", notes: "Fastest, excellent realism" },
      { model: "stable-diffusion", imageUrl: "/placeholders/holi-001-sd.jpg", quality: "medium", renderTime: "~60s", notes: "Free, good detail" }
    ],
    copyCount: 342, likes: 128
  }
  // Agent will generate 3+ posters per trend based on this pattern
];
```

---

## 🛣️ API Routes

```
GET  /api/trends                  → all active trends, isTrending first
GET  /api/trends/:slug            → single trend details
GET  /api/trends/category/:cat    → filter by category
GET  /api/posters?trendId=xxx     → posters for a trend
GET  /api/posters/trending        → top 8 by copyCount (all trends)
GET  /api/posters/:id             → single poster + all modelOutputs
POST /api/posters/:id/copy        → increment copyCount
POST /api/posters/:id/like        → increment likes
GET  /health                      → { status: 'ok' } for UptimeRobot
```

---

## 🎨 Design Tokens (Dark Theme)

```css
--bg-primary:       #0f0f13
--bg-card:          #1a1a24
--bg-card-hover:    #22222f
--accent-primary:   #7c3aed   /* Purple — brand */
--accent-secondary: #06b6d4   /* Cyan */
--text-primary:     #f8fafc
--text-muted:       #94a3b8
--border:           #2d2d3d
--success:          #10b981   /* Copy success green */

Fonts:
  Headings:  Plus Jakarta Sans (Google Fonts)
  Body:      Inter
  Prompts:   JetBrains Mono (monospace — makes prompts feel professional)

Model badge colors:
  Midjourney = purple (#7c3aed)
  DALL·E 3   = green  (#10b981)
  Flux       = blue   (#3b82f6)
  Stable Diffusion = orange (#f97316)
```

---

## 📋 Step-by-Step Build Order (Antigravity Agent Prompts)

> **How to use:** Open Manager View → New Task → paste the prompt for that phase.
> Use **Plan Mode** for complex phases. Use **Fast Mode** for mechanical phases.
> Run `/commit-check` after every phase before starting the next.

---

### **Phase 1 — Project Scaffolding**
> Model: Gemini 3 Pro | Mode: **Plan Mode**

```
Scaffold a MERN stack project called 'ai-poster-gallery' in the current folder.

Requirements:
- server/: Express 5, Mongoose, cors, dotenv, morgan, express-rate-limit
- client/: Vite + React 18 + Tailwind CSS v3 + React Router v6 + Axios
- Root package.json: "dev" script using concurrently to run client and server
- server/.env: PORT=5000, MONGO_URI=placeholder, NODE_ENV=development, CLIENT_URL=http://localhost:5173
- client/.env: VITE_API_BASE_URL=http://localhost:5000/api
- .gitignore: node_modules, .env, dist, .DS_Store
- ES modules (import/export) everywhere — no CommonJS
- Create .antigravity/rules.md with a brief summary of the project stack

Show me the full implementation plan before writing any files.
```

✅ **After:** Verify folder structure. Fix anything off in Editor View. Then commit.

---

### **Phase 2 — MongoDB Models + Seed Data**
> Model: Gemini 3 Pro | Mode: **Plan Mode**

```
Create Mongoose models and seed data for ai-poster-gallery.

1. Create server/models/Trend.js — schema:
   [paste Trend Schema from this doc]

2. Create server/models/Poster.js — schema:
   [paste Poster Schema from this doc]

3. Create server/data/seed.js that:
   - Connects to MongoDB via MONGO_URI in .env
   - Drops and recreates Trends and Posters collections
   - Seeds all 6 trends
   - Seeds at least 3 realistic AI poster prompts per trend (18+ total)
   - Each poster must have all 4 modelOutputs entries
   - Prompts must be genuine, detailed, style-appropriate for each trend theme
   - Logs progress to console with success/failure

4. Create client/src/data/hardcoded.js mirroring the same data (v1.0 fallback)

Use this as the base data:
[paste TRENDS and POSTERS arrays from this doc]

After creating seed.js, run it and show me the console output confirming success.
```

✅ **After:** Sign up for MongoDB Atlas free M0. Update `.env` MONGO_URI. Re-run seed. Commit.

---

### **Phase 3 — Express API Routes**
> Model: Gemini 3 Pro | Mode: **Fast Mode**

```
Create all Express API routes and controllers for ai-poster-gallery.

Endpoints:
- GET /api/trends — active trends, isTrending=true first
- GET /api/trends/:slug — single trend by slug
- GET /api/trends/category/:cat — filter trends by category
- GET /api/posters?trendId=xxx — active posters for a trend
- GET /api/posters/trending — top 8 posters by copyCount across all trends
- GET /api/posters/:id — single poster with all fields
- POST /api/posters/:id/copy — increment copyCount, return { copyCount }
- POST /api/posters/:id/like — increment likes, return { likes }
- GET /health — return { status: 'ok', timestamp: Date.now() }

Structure:
- server/routes/trends.js + server/routes/posters.js
- server/controllers/trendsController.js + postersController.js
- server/middleware/errorHandler.js — catches all errors, returns JSON
- Wire all routes in server/index.js with proper middleware order

Requirements:
- try/catch on all async operations
- HTTP 200/201/400/404/500 used correctly
- CORS configured to allow CLIENT_URL from .env
- Rate limit POST endpoints: 30 req/min per IP

After creating all routes, test EVERY endpoint with curl in the terminal.
Show me the curl output for each route before finishing.
```

✅ **After:** Verify all 9 endpoints in Antigravity's built-in browser or Postman. Commit.

---

### **Phase 4 — Homepage (Trend Grid)**
> Model: **Claude Sonnet 4.6** (switch in model selector) | Mode: **Plan Mode**

```
Build the React homepage for ai-poster-gallery using Claude Sonnet 4.6.

Files to create:
- client/src/pages/HomePage.jsx
- client/src/components/home/HeroBanner.jsx
- client/src/components/home/TrendGrid.jsx
- client/src/components/home/TrendCard.jsx
- client/src/components/common/TagBadge.jsx
- client/src/components/common/LoadingSpinner.jsx (animated pulse spinner)

Dark theme design tokens:
  bg: #0f0f13, cards: #1a1a24, accent: #7c3aed, text: #f8fafc, muted: #94a3b8

HeroBanner:
- Full-width gradient header (purple to dark)
- Headline: "Trending AI Poster Prompts" (Plus Jakarta Sans, 3xl-5xl bold)
- Subtitle: "Browse, copy, and create stunning AI posters in seconds"
- Google Fonts import for Plus Jakarta Sans + Inter

TrendGrid:
- 2 cols mobile → 3 cols tablet → 4 cols large desktop (gap-6)
- Fetch from GET /api/trends (VITE_API_BASE_URL)
- Show LoadingSpinner while fetching, then show skeleton cards, then real cards
- Category filter chips above grid: All · Festival · Sports · Seasonal · Occasion
  Active chip: bg-purple-600. Click filters cards client-side.

TrendCard:
- Cover image: aspect-[4/3], object-cover, rounded-xl
- Emoji badge: absolute top-3 left-3, white bg pill
- "🔥 Trending" badge: absolute top-3 right-3, bg-purple-600 pill (if isTrending)
- Title (bold), description (2-line truncate, muted)
- Tag chips row (TagBadge components, max 3 visible)
- Footer: poster count ("8 prompts") + chevron right icon
- Hover: scale-105 transition, border-purple-500/50 glow
- Click: navigate to /trend/:slug with React Router

Tailwind utility classes only. No custom CSS.
Show implementation plan before coding.
```

✅ **After:** Use Antigravity's built-in browser to verify homepage at 375px (mobile) and 1280px (desktop). Commit.

---

### **Phase 5 — Trend Gallery Page**
> Model: **Claude Sonnet 4.6** | Mode: **Plan Mode**

```
Build the Trend Gallery page for ai-poster-gallery.

Files to create:
- client/src/pages/TrendPage.jsx
- client/src/components/gallery/PosterGrid.jsx
- client/src/components/gallery/PosterCard.jsx
- client/src/components/gallery/FilterBar.jsx
- client/src/components/common/CopyButton.jsx
- client/src/hooks/useCopyToClipboard.js

Route: /trend/:slug
Data: fetch trend from GET /api/trends/:slug, posters from GET /api/posters?trendId=[id]

TrendPage layout:
- Hero section: trend cover image (blurred bg with overlay), emoji (4xl), title, description, tags
- Back button (← All Trends) → navigate to homepage
- FilterBar + PosterGrid below

FilterBar:
- Horizontal scrollable chip row (no wrapping on mobile)
- Options: All / Photorealistic / Illustration / 3D / Watercolor
- Active chip: bg-purple-600. Filters PosterGrid client-side by style field.

PosterGrid:
- 3 cols desktop → 2 cols tablet → 1 col mobile (gap-5)
- Skeleton cards while loading

PosterCard:
- Preview image (overflow-hidden rounded-xl, hover: scale image 105%)
- Gradient overlay on bottom: title truncated + style badge + aspect ratio badge
- CopyButton at bottom of card (full width)

CopyButton (useCopyToClipboard hook):
- Idle: clipboard icon + "Copy Prompt" (bg-white/10 hover:bg-purple-600)
- Copied: checkmark icon + "Copied!" green, pulse animation for 2s
- On copy: navigator.clipboard.writeText(prompt) + POST /api/posters/:id/copy (fire-and-forget)
- React Hot Toast notification: "✓ Prompt copied to clipboard!"
- On image click (not copy button): open PosterModal via AppContext

Install react-hot-toast. Add <Toaster /> to App.jsx.
Show plan before coding.
```

✅ **After:** Test full copy flow. Verify toast appears. Check copy count increments in MongoDB via Atlas dashboard. Commit.

---

### **Phase 6 — Poster Modal + Model Comparison**
> Model: **Claude Sonnet 4.6** | Mode: **Plan Mode**

```
Build the PosterModal — the centerpiece feature of ai-poster-gallery.

Files to create:
- client/src/components/modal/PosterModal.jsx
- client/src/components/modal/PromptPanel.jsx
- client/src/components/modal/ModelComparison.jsx
- client/src/components/modal/ModelImageCard.jsx
- client/src/context/AppContext.jsx (global modal state + selectedPoster)
- client/src/hooks/useModal.js

AppContext provides:
  { selectedPoster, openModal(poster), closeModal(), isOpen }
Wrap App.jsx children in <AppProvider>.
PosterCard calls openModal(poster) on image click.

PosterModal layout:
- Fixed full-screen overlay: backdrop-blur-sm bg-black/70, z-50
- Modal: max-w-5xl w-full mx-auto, rounded-2xl, bg-[#1a1a24], max-h-[90vh] overflow-y-auto
- Desktop: flex row — Left 55% image | Right 45% tabbed panel
- Mobile: flex col — image top, panel below (full screen feel)
- Framer Motion: AnimatePresence + motion.div (opacity 0→1, y 20→0, duration 0.25s)
- Close: × button top-right, ESC key listener, backdrop click

Left panel:
- Large poster image (object-contain, max-h-[60vh])
- Model name pill badge bottom-left (colored per model)

Right panel — Tab 1 "Prompt":
- Poster title (xl bold) + tag chips
- Label "AI Prompt" (muted xs uppercase)
- Prompt block: <pre> tag, font JetBrains Mono, bg-[#0f0f13], p-4, rounded-xl,
  text-sm, max-h-52 overflow-y-auto, text-wrap: wrap
- CopyButton (large, full width, purple)
- Collapsible "Negative Prompt" (chevron toggle, smooth height animation)
- Metadata chips row: Style + Aspect Ratio + Primary Model

Right panel — Tab 2 "Compare Models":
- Header: "Same prompt. Different AI. You decide." (bold)
- Subtitle: "See how each model interprets this exact prompt" (muted)
- 2×2 grid of ModelImageCard

ModelImageCard:
  - Colored top border per model (purple/green/blue/orange)
  - Placeholder image (onError fallback: grey bg + model initial letter)
  - Model name (bold) + render time (muted)
  - Notes text (italic, muted xs)
  - Hover: border glow in model color

Install framer-motion.
Show full plan before coding.
```

✅ **After:** Click through full flow: homepage → trend → card → modal → prompt tab → copy → compare tab. Fix any issues before Phase 7. Commit.

---

### **Phase 7 — Polish + Responsive**
> Model: Gemini 3 Pro | Mode: **Fast Mode**

```
Polish ai-poster-gallery in one agent pass. Make all these changes:

Navbar (client/src/components/common/Navbar.jsx):
- Logo: "✦ PromptGallery" gradient text (purple to cyan)
- Right: "Suggest a Trend" link (href="mailto:hello@example.com")
- Sticky top, backdrop-blur-md, border-b border-white/5 on scroll
- Hide "Suggest a Trend" on xs screens

Footer (client/src/components/common/Footer.jsx):
- Tagline: "Prompt: copy. Create: yours."
- Credits: "Prompts tested on Midjourney · DALL·E 3 · Flux · Stable Diffusion"
- bg-[#0f0f13], text-center, py-8, border-t border-white/5

Skeleton loaders:
- TrendCardSkeleton: animated pulse matching TrendCard proportions
- PosterCardSkeleton: same for PosterCard
- Show during API fetch, replace with real cards on success

Empty states:
- TrendPage no posters: centered icon + "No prompts yet for this trend"
- 404 page: "Lost in the AI multiverse 🌌" + "Back to Homepage" button

Scroll UX:
- ScrollToTop component: useEffect on location.pathname to scroll window to 0,0
- Add to App.jsx inside Router

document.title:
- HomePage: "PromptGallery — Trending AI Poster Prompts"
- TrendPage: "[Trend Title] — PromptGallery"

Mobile modal fix:
- On screens < 768px: PosterModal is full-screen, stacked (image top, panel below)
- No side-by-side layout on mobile
```

✅ **After:** Full mobile audit at 375px. Verify all empty states. Commit.

---

### **Phase 8 — Analytics + Likes**
> Model: Gemini 3 Pro | Mode: **Fast Mode**

```
Wire up engagement tracking in ai-poster-gallery.

Copy count display:
- Show copyCount on each PosterCard: "342 copies" in muted text below copy button
- Optimistic UI: increment immediately on copy click, revert on POST failure

Like button:
- Add heart icon button to PosterCard footer and PosterModal header
- POST /api/posters/:id/like on click
- Optimistic UI: heart fills red + count increments immediately
- localStorage key "liked_[posterId]" = true — prevents duplicate likes per device
- On mount: check localStorage to set initial filled/empty heart state

"Most Copied" strip on HomePage:
- Horizontal scroll strip between HeroBanner and category filter chips
- Title: "🔥 Most Copied This Week"
- Fetch from GET /api/posters/trending (top 8)
- Each item: small thumbnail (60x60 rounded) + title (truncated) + copy count
- Click: navigate to that poster's trend page

TrendCard copy count:
- Add GET /api/trends/:slug/stats → { totalCopies, totalLikes } (sum from posters)
- Display total copies on TrendCard footer alongside poster count
```

✅ **After:** Test like toggle persists on page refresh. Test copy count increments in real-time. Commit.

---

### **Phase 9 — Free Tier Deployment**
> Model: Gemini 3 Pro | Mode: **Plan Mode**
> *(Use Antigravity's built-in browser to verify live URLs after deploy)*

```
Prepare ai-poster-gallery for free-tier deployment. Create all config files.

1. client/vercel.json:
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

2. server/render.yaml:
services:
  - type: web
    name: ai-poster-gallery-api
    env: node
    buildCommand: npm install
    startCommand: node index.js
    envVars:
      - key: MONGO_URI
        sync: false
      - key: CLIENT_URL
        sync: false
      - key: NODE_ENV
        value: production

3. Update server/index.js:
   - app.set('trust proxy', 1) — required for Render
   - CORS: read CLIENT_URL from env, allow all Vercel preview URLs (*.vercel.app)
   - Confirm GET /health endpoint exists and returns { status: 'ok' }

4. client/.env.production:
   VITE_API_BASE_URL=https://REPLACE_WITH_RENDER_URL.onrender.com/api

5. Root README.md:
   - Local dev setup (5 steps)
   - Seed command
   - Environment variables list

Print a numbered checklist of every manual step I need to do on each platform dashboard.
```

**Manual steps (do these in order after Phase 9 code is committed):**
```
① MongoDB Atlas (atlas.mongodb.com)
   → Create free account → Build M0 cluster (free, 512MB)
   → Database Access: create user + password
   → Network Access: allow 0.0.0.0/0 (all IPs — needed for Render)
   → Connect: copy connection string
   → Replace <password> in string → save as MONGO_URI

② Run seed on Atlas
   → Update server/.env MONGO_URI with Atlas string
   → node server/data/seed.js
   → Verify in Atlas UI: 6 trends, 18+ posters visible

③ GitHub
   → git remote add origin [your repo URL]
   → git push origin main

④ Render (render.com)
   → New → Web Service → Connect GitHub repo
   → Root directory: server
   → Build: npm install | Start: node index.js
   → Environment vars: MONGO_URI=[Atlas string], CLIENT_URL=https://TEMP.vercel.app, NODE_ENV=production
   → Deploy → copy your .onrender.com URL

⑤ Vercel (vercel.com)
   → New Project → Import GitHub repo
   → Root directory: client
   → Environment var: VITE_API_BASE_URL=https://[render-url].onrender.com/api
   → Deploy → copy your .vercel.app URL

⑥ Update Render CLIENT_URL
   → Render dashboard → Environment → update CLIENT_URL to your Vercel URL
   → Trigger manual redeploy

⑦ UptimeRobot (uptimerobot.com)
   → New Monitor → HTTP(S)
   → URL: https://[render-url].onrender.com/health
   → Check interval: every 5 minutes
   → This keeps Render free tier awake (prevents 30s cold starts)

⑧ Test live
   → Open Vercel URL in Antigravity's built-in browser
   → Copy a prompt, verify copy count increments, verify modal opens
   → Done 🚀
```

---

## ✨ Bonus Feature Prompts

### 🔍 Global Search
```
Add a search bar to the Navbar. On type (debounced 300ms):
- Backend: GET /api/search?q=xxx — MongoDB text index on Poster.prompt + title
- Returns top 10 results with trendId populated
- Frontend: dropdown below search bar, each result shows thumbnail + title + trend name
- Click result: navigate to /trend/:slug, open that poster's modal
- ESC or click outside closes dropdown
```

### 🎛️ Prompt Remix Editor
```
Add "Remix Prompt" to PosterModal, below the copy button (Tab 1).
On click, expand an inline editor:
- Parse prompt into labeled segments: Subject, Style, Lighting, Camera, Extra Parameters
- Each segment: editable text field pre-filled from original
- Live "Remixed Prompt Preview" updates as user types
- "Copy Remixed Prompt" button at bottom
- Purely client-side — no backend changes needed
```

### 🎯 Aspect Ratio Visual Indicator
```
In PosterModal metadata chips row, add an SVG aspect ratio visualizer:
- 1:1 → small square outline
- 16:9 → wide landscape rectangle  
- 9:16 → tall portrait rectangle
- 4:5 → near-square portrait rectangle
Each labeled: "1:1 Square", "9:16 Portrait" etc.
Pure inline SVG + Tailwind. No library.
```

---

## 🔮 V2.0 Admin Dashboard (Future)

When you're ready to move beyond hardcoded data, start a new Antigravity session with:

```
Add a protected admin dashboard at /admin to ai-poster-gallery.

Auth: JWT login — email + password from env vars (no user model in v2)
Protected route: redirect /admin/login if no valid token in localStorage
JWT expires: 7 days

Admin pages:
- /admin — stats dashboard: total trends, posters, copies, likes
- /admin/trends — table: list, toggle isActive/isTrending, drag to reorder
- /admin/trends/new — form: all Trend fields + Cloudinary image upload
- /admin/trends/:id/edit — pre-filled form
- /admin/posters — filter by trend, poster table
- /admin/posters/new — form: all Poster fields, up to 4 modelOutput entries
- /admin/posters/:id/edit — pre-filled

Images: Cloudinary free tier (cloudinary.com — 25GB free)
- Upload widget in image fields
- Store returned Cloudinary URL in MongoDB

Keep all v1.0 seed data intact — admin adds on top.
```

---

## 🧠 Antigravity Pro Tips

**Annotate the Implementation Plan before the agent codes**
In Plan Mode, the agent shows you a full task plan as an Artifact. Read it before approving. Highlight any line and leave a comment ("Use Framer Motion not CSS here", "No, keep this client-side"). The agent updates the plan and incorporates feedback without restarting.

**Spawn parallel agents for Phase 7**
In Manager View, you can run multiple agents at once. While one polishes Navbar, spawn a second for Footer, a third for skeleton loaders. This is Antigravity's biggest time-saver — 3 tasks in the time of one.

**Use the built-in browser for UI verification**
After Phases 4, 5, and 6, use Antigravity's built-in Chrome to click through the real running app without leaving the IDE. If the UI looks wrong, screenshot the artifact and comment on it — the agent will fix and re-verify.

**The Brain directory persists across sessions**
Antigravity stores `.gemini/antigravity/brain/` with learned project preferences. Reopen tomorrow and the agent already knows your stack, naming conventions, and past decisions. Multi-day builds stay consistent.

**Switch models deliberately, not randomly**
Set a rule for yourself: Gemini 3 Pro for anything that generates files mechanically. Claude Sonnet 4.6 only for phases with complex state logic, animations, and component architecture. This keeps your free quotas healthy throughout the project.

**Commit ritual = safety net**
Run `/commit-check` after each phase. A bad Phase 6 agent run can't ruin Phase 4 if you committed. `git revert` is your friend.

---

## 💰 Total Cost: $0/month

| Service | Plan | Cost |
|---------|------|------|
| Google Antigravity | Free public preview | $0 |
| MongoDB Atlas | M0 Cluster (512MB) | $0 |
| Render | Free Web Service | $0 |
| Vercel | Hobby Plan | $0 |
| UptimeRobot | Free (50 monitors) | $0 |
| GitHub | Free | $0 |
| **Total** | | **$0** |

---

*Built with Google Antigravity + MERN Stack*  
*Prompt: copy. Create: yours.*
