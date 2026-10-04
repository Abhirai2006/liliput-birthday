# Wonderland — A Birthday Experience for Subbi

A private, interactive birthday website created for **Aishwarya “Subbi” Teli** and her 21st birthday on 18 September. It combines a cinematic night-sky presentation, an interactive 3D cake, carefully curated memories, voice recordings, and audience-specific access in one mobile-first experience.

## Highlights

- Interactive two-tier 3D birthday cake with an animated candle flame
- Hold-to-blow candle interaction followed by celebratory confetti
- Wrapped opening sequence and animated age reveal
- Curated photo and video chapters spanning childhood, school, celebrations, sarees, stories, and everyday moments
- Polaroid-style memory wall and full-screen media lightbox
- Dedicated singing player for her voice recordings
- Personal sections for Daa, shared memories, the Eevee note, and a letter from Pappa
- Optional countdown seal for the birthday launch
- Responsive presentation designed primarily for phones

## Audience Versions

The same URL supports three carefully separated experiences. The selected version is remembered in the browser and can be changed at any time through **Switch word** in the footer.

| Version | Access | Content |
| --- | --- | --- |
| **Guest** | Select **Just looking around** | Stars, opening sequence, cake, candle, confetti, and a privacy notice. No personal photos or videos are rendered. |
| **Family** | Enter `dcprincess` | Family-safe story and media collection, with private people, calls, memories, and selected photos excluded. Uses a dedicated family-album main image. |
| **Her** | Enter `frompappa` | Complete experience with every chapter, photo, video, recording, personal memory, and letter. |

Password matching is handled on the server so the access words are not included in the browser bundle. Media filtering is centralized by audience level, and excluded items are not rendered for that version.

## Experience Structure

| Section | Description |
| --- | --- |
| **Opening cover** | A wrapped presentation that reveals the page with confetti |
| **Birthday scene** | Interactive 3D cake, live candle flame, and wish interaction |
| **Age reveal** | Animated transition from 20 to 21 |
| **About Aishwarya** | Personal introduction with a family-specific lead photograph |
| **Photo chapters** | Curated collections with captions, portrait-aware framing, and lightbox viewing |
| **Singing player** | A custom player for her voice recordings |
| **Personal memories** | Daa, shared moments, calls, Misty, and the Eevee note in the private version |
| **Letter** | A closing birthday letter signed “Pappa” |

All supplied media was reviewed individually. Rotation and framing were corrected where needed, application UI was cropped out, and original aspect ratios were preserved.

## Birthday Seal

The birthday target is defined in `src/lib/birthday.ts` as **18 September at 00:00 IST**. The `SEAL_ENABLED` flag in `src/routes/index.tsx` controls whether the countdown lock is active.

```ts
const SEAL_ENABLED = false; // Open for review
const SEAL_ENABLED = true;  // Locked until the birthday
```

When enabled, the seal blocks the experience until the target time. The existing author preview key remains available for private review.

## Technology

- [TanStack Start](https://tanstack.com/start) and TanStack Router
- React 19 and TypeScript
- Tailwind CSS v4
- React Three Fiber and Drei
- Motion
- canvas-confetti
- Zod

## Local Development

### Requirements

- Bun

### Setup

```bash
bun install
bun run dev
```

The local development server is then available at the URL printed in the terminal.

### Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run lint checks |
| `bun run format` | Format the project |

## Project Notes

- The countdown seal is currently disabled for review.
- Access selection is stored locally so returning visitors reopen the same version.
- Choosing **Switch word** clears the saved selection and returns to the access screen.
- The family and guest experiences intentionally omit private content rather than hiding it visually.

---

Made in the dark, at 00:00 IST, for one short girl from Ainapur.

Continue editing in the [Lovable editor](https://lovable.dev/projects/490f956a-615e-434c-ba79-71cf75646a64).
