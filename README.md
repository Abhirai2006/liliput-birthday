# Wonderland — for Subbi

A one-page birthday site for **Aishwarya M Teli** (Ganiger) — *Subbi* to the people
who love her, *lilliput* to exactly one person, because five feet is five feet.
Born 18 September 2005, Ainapur, Belagavi, north Karnataka.

Built as a gift, not a project.

---

## What's inside

| Section | What it does |
| --- | --- |
| **The seal** | A countdown that refuses to open the page until 18 September, 00:00 IST |
| **Hero** | A 3D cake with a live flame — hold the candle to blow it out, confetti follows |
| **Age reveal** | 20 crossed out, 21 struck in, sparks included |
| **The girl from Ainapur** | Her names, her roots, and one tap-to-reveal truth about how easily she forgives |
| **The chapters** | Childhood prints, school (not college), sarees, nights out, her people, Misty the dog, call screenshots |
| **The wall** | Pinned polaroids on heart tacks, dropping in one by one |
| **Her actual voice** | Eight recordings of her singing, in a player built for exactly this |
| **do u remember this?** | The Eevee sticky note SR drew for her the day she left Mysuru for the holidays |
| **The letter** | Handwritten, signed *Pappa* |

Every photo and video was gone through by hand — rotation fixed, app UI cropped out,
nothing squashed, nothing stretched. 180-odd files, one at a time.

## How the seal works

`src/lib/birthday.ts` holds the target: **18 September, 00:00 IST**.
`SEAL_ENABLED` in `src/routes/index.tsx` turns the lock on and off, and
`?open=subbi` is the author's private key past it.

```
SEAL_ENABLED = false   // open, for review
SEAL_ENABLED = true    // locked until the date
```

## Built with

TanStack Start · React 19 · Tailwind v4 · React Three Fiber (the cake)
· Motion (everything that moves) · canvas-confetti

Mobile first — she will almost certainly open it on her phone.

## Running it

```sh
npm i
npm run dev
```

---

Made in the dark, at 00:00 IST, for one short girl from Ainapur.
Continue editing in the [Lovable editor](https://lovable.dev/projects/490f956a-615e-434c-ba79-71cf75646a64).
