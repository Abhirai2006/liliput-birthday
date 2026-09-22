# Three versions of the page, one link

One link for everyone. What you see depends on what you type on the password screen.

## The three levels

**1. Guest (no password)**
The password screen gets a "just looking around" way in. It opens a version with:
- the stars, the wrapped cover, the confetti, the cake and the candle you can blow out
- the birthday headline without her name, generic wording ("Happy Birthday" instead of "Subbi")
- no photos, no videos, no letter, no about-her details, no songs, no call screenshots
- a short line saying the personal part is private

Nothing of hers is sent to the browser at this level, so there is nothing to dig out.

**2. Family — password `dcprincess`**
Everything except anything that could feel private in front of family:
- removed: the Daa section, the "Us" section, the letter, the call screenshots, the photo with her Appa, the haldi photo with Tarun, and Misty (Daa's dog)
- kept: childhood, printed photos, college, everyday, getting ready, out and about, sarees, singing, last birthday, her story photos, the age reveal, the cake

**3. Her — password `_aunty_` (unchanged)**
The full page exactly as it is now.

## Suggestions / upgrades

- **A greeting per level.** Family sees "Made for Aishwarya, from all of us" — she sees the current "lilliput" wording. Small, but it stops the page feeling like a leak.
- **A guestbook.** Family members leave a short wish that she sees in her own version. Needs the built-in backend (database) — one extra step, big payoff.
- **No hint on the password box for others.** Keep the current riddle only for her; family gets a plain "enter the family word" so the riddle stays hers.
- **Skip a friends version for now** as you said; if you want it later it is one more level with its own word, no rework.
- **Guest view doubles as your share/preview link** — safe to send to anyone, including on social, since it has no photos.

## Technical notes

- Add an `audience` level (`guest` | `family` | `her`) resolved server-side in `src/lib/gate.server.ts`; `checkGate` returns the level for the typed word instead of a yes/no, `guest` needs no word.
- `src/lib/gate.functions.ts` returns the level; `PasswordGate` stores it in localStorage and passes it down.
- Tag each collection and section in `src/lib/media.ts` with the minimum level that may see it, and filter in one helper (`shotsFor(level)`), so nothing is hidden by CSS only — excluded photos are never rendered.
- `src/routes/index.tsx` renders sections conditionally by level; guest renders only hero, cake, age-free headline and footer.
- Keep `SEAL_ENABLED` and the existing lock behaviour untouched.
