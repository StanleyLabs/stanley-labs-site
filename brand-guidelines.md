# Stanley Labs — Brand Guidelines (v0.1)

**Last updated:** 2026-02-19  
**Status:** Draft / living document

## 1) Brand essence

### Positioning
Stanley Labs builds **fast, cinematic websites and software**.

### Current tagline (conversion-first)
**Websites & software for businesses.**

### Future tagline (studio expansion)
**A creative technology studio.**

> Rule: Keep the brand system flexible so the headline can shift from “businesses” → “studio” without redesigning the site.

### Personality
- **Polished**: clear, calm, premium, reliable
- **Experimental edge (subtle)**: retro-future micro-details, systems language, cinematic texture
- **No cringe**: no loud neon overload, no “hacker” clichés, no gimmicky effects

### Voice & tone
- Direct, confident, technical when helpful
- Short sentences, strong verbs
- Use “we” (studio voice) even if solo right now

Examples:
- “Ship fast. Look premium.”
- “Built in React/TypeScript. Deployed clean.”


## 2) Visual direction

### Aesthetic keywords
**Retro-future + cinematic + NES-influenced grayscale**

### Visual rules of thumb
- **90% grayscale / 10% accent**
- Prefer **sharp typography + clean layout** over heavy illustration
- Use texture sparingly: subtle grain, soft glows, minimal gradients


## 3) Color system

### Core grayscale
- **Ink**: `#0B0D10` (primary background)
- **Graphite**: `#151A21` (surfaces / cards)
- **Steel**: `#2A313C` (borders / secondary surfaces)
- **Fog**: `#C7CEDA` (secondary text)
- **Paper**: `#F2F4F7` (primary text)

### Accents (sparingly)
- **Electric (blue)**: `#2D6BFF` (primary CTA, links)
- **Signal (red)**: `#FF3B3B` (highlights, warnings, rare emphasis)
- **Success (green)**: Tailwind `green-400` (availability dot / success states)

Usage guidance:
- CTA buttons default to **Electric**.
- Reserve **Signal** for small, intentional highlights.
- Avoid using red for “available/ok” states (reads like error).


## 4) Typography

### Font families
- **Display / headings:** Space Grotesk
- **Body:** Inter
- **System labels / UI microcopy:** JetBrains Mono

### Typesetting notes
- Headlines: tight leading, high contrast, minimal fluff
- Mono labels: short, uppercase, spaced (e.g., `STATUS: AVAILABLE`)


## 5) Logo & marks

### System
Flexible set:
- **Wordmark:** “STANLEY LABS” (engineered, tracked)
- **Icon:** “SL” mark (used for favicon, social avatar)

### Favicon
- Source: `public/sl.svg` (authoritative)

Guidance:
- Favicon must be readable at 16–32px.
- Prefer a bold mark + simple border over fine details.


## 6) UI styling (web)

### Layout
- Clean grid, generous spacing
- Cards: subtle borders, low-contrast surfaces

### Effects (the “edge”)
Allowed (subtle):
- Light film grain overlay
- Soft radial gradients behind hero
- Minimal glow on hover

Avoid:
- Heavy scanlines
- Fast animations
- Distracting noise

### Components
- Buttons: solid Electric primary, soft bordered secondary
- Panels: `graphite` surface + hairline border


## 7) Content guidelines (web)

### Offer clarity
Lead with the thing that sells now:
- Websites (landing pages, full sites)
- Software (web apps) as an upgrade path

### Proof
- Highlight real projects and add spec redesigns as case studies
- Case study template: Problem → Approach → Result (or expected result for spec)


## 8) Implementation references (current codebase)

### Tailwind theme tokens
See: `tailwind.config.js`

### Calendly
Book page embeds Calendly on `/book`.


---

## Appendix: Quick “do / don’t”

**Do**
- Keep it monochrome-first
- Use Electric blue for CTAs
- Write confident, simple copy

**Don’t**
- Over-neon the palette
- Hide the CTA
- Add effects that reduce readability
