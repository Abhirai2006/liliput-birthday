import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

import StarField from "@/components/StarField";
import LockScreen from "@/components/LockScreen";
import Chapter from "@/components/Chapter";
import AboutHer from "@/components/AboutHer";
import { DaaSection, UsSection } from "@/components/PeopleSections";
import Remember from "@/components/Remember";
import Letter from "@/components/Letter";
import Lightbox from "@/components/Lightbox";
import SingingPlayer from "@/components/SingingPlayer";
import AgeReveal from "@/components/AgeReveal";
import CoverSheet from "@/components/CoverSheet";
import PasswordGate, { GATE_KEY } from "@/components/PasswordGate";
import {
  chapters,
  newChapters,
  augChapters,
  childhoodShots,
  kidPrints,
  schoolShots,
  sareeShots,
  mistyShots,
  callShots,
  wallShots,
  singShots,
  lastBirthdayShots,
  storyShots,
  shotsFor,
  type Audience,
  type Shot,
} from "@/lib/media";
import { hasPreviewKey, msUntilBirthday } from "@/lib/birthday";


const CandleScene = lazy(() => import("@/components/CandleScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Subbi — 18 September" },
      {
        name: "description",
        content:
          "A birthday page made for Aishwarya M Teli — photos, videos and a candle to blow out, sealed until 18 September, 00:00 IST.",
      },
      { property: "og:title", content: "For Subbi — 18 September" },
      {
        property: "og:description",
        content: "A birthday page made for Aishwarya M Teli — photos, videos and a candle to blow out, sealed until 18 September, 00:00 IST.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayPage,
});

/** Seal temporarily lifted at his request — flip to true to re-lock until 18 Sep, 00:00 IST. */
const SEAL_ENABLED = false;

function BirthdayPage() {
  const [state, setState] = useState<"loading" | "locked" | "gate" | "open">("loading");
  const [level, setLevel] = useState<Audience>("her");
  const [lit, setLit] = useState(true);
  const [shot, setShot] = useState<Shot | null>(null);
  const [wrapped, setWrapped] = useState(true);

  useEffect(() => {
    if (SEAL_ENABLED && msUntilBirthday() > 0 && !hasPreviewKey()) {
      setState("locked");
      return;
    }
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(GATE_KEY);
    } catch {
      saved = null;
    }
    if (saved === "her" || saved === "family" || saved === "guest") {
      setLevel(saved);
      setState("open");
      return;
    }
    setState("gate");
  }, []);

  const unlock = useCallback(() => setState("gate"), []);
  const openGate = useCallback((lvl: Audience) => {
    setLevel(lvl);
    setState("open");
  }, []);

  const celebrate = useCallback(() => {
    setWrapped(false);
    const shoot = (x: number, y: number, delay: number, count: number) =>
      window.setTimeout(
        () =>
          confetti({
            particleCount: count,
            spread: 78,
            startVelocity: 46,
            scalar: 1.05,
            ticks: 220,
            origin: { x, y },
            colors: ["#ffd27a", "#ffb0c4", "#fff6ec", "#d9557a", "#ffe9c9"],
          }),
        delay,
      );
    shoot(0.5, 0.62, 60, 120);
    shoot(0.12, 0.75, 260, 70);
    shoot(0.88, 0.75, 380, 70);
    shoot(0.5, 0.4, 620, 90);
  }, []);

  const blow = useCallback(() => {
    setLit(false);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 },
      colors: ["#ffd27a", "#ffb0c4", "#fff6ec", "#d9557a"],
    });
  }, []);

  if (state === "loading") {
    return <div className="min-h-screen" />;
  }

  if (state === "locked") {
    return <LockScreen onUnlock={unlock} />;
  }

  if (state === "gate") {
    return <PasswordGate onOpen={openGate} />;
  }

  const isHer = level === "her";
  const isGuest = level === "guest";
  const pick = (shots: Shot[]) => shotsFor(level, shots);

  return (
    <>
      {wrapped ? <CoverSheet onDone={celebrate} /> : null}

      <div className="pointer-events-none fixed inset-0 -z-10">
        <StarField density={0.9} />
      </div>

      {/* playful side nickname — tucked low, easy to miss */}
      <div className={`pointer-events-none fixed bottom-3 right-4 z-30 ${isHer ? "" : "hidden"}`}>
        <span className="font-hand text-sm tracking-[0.25em] text-primary/25">
          Huch Aish
        </span>
      </div>

      <main className="overflow-x-clip">
        <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-[0.65rem] uppercase tracking-[0.45em] text-primary"
          >
            {isGuest ? "18 September · a birthday page" : "18 September · she turns 21"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="mt-5 text-5xl leading-[1.05] text-glow sm:text-7xl"
          >
            Happy Birthday,
            <span className="block italic text-primary">{isGuest ? "to you" : "Subbi"}</span>
          </motion.h1>

          <Suspense fallback={<div className="h-[380px] w-full sm:h-[460px]" />}>
            <div className="w-full max-w-xl">
              <CandleScene lit={lit} onBlow={blow} />
            </div>
          </Suspense>

          <motion.p
            key={lit ? "lit" : "out"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-2 max-w-md font-hand text-2xl text-candle-soft"
          >
            {lit
              ? isGuest
                ? "One candle, one wish. Go on — blow it out."
                : "One candle, one wish. Take your time, lilliput."
              : isGuest
                ? "Wish made. The rest of this page is private."
                : "Wish made. Now scroll — the whole night is about you."}
          </motion.p>
        </section>

        {isGuest ? (
          <section className="mx-auto w-full max-w-xl px-5 py-24 text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">the rest is private</p>
            <h2 className="mt-5 text-3xl italic sm:text-4xl">This part is only for her</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The photos, the videos, the letter - all of it sits behind a word only a few people
              know. You are welcome to the cake and the candle.
            </p>
          </section>
        ) : null}

        {isGuest ? null : (
          <>
        <AgeReveal />

        <AboutHer onOpen={setShot} family={level === "family"} />

        <Chapter
          title="Before she was Subbi"
          note="Ainapur, two plaits, and a girl who already knew how to pose. These are the oldest photos I have of her."
          shots={pick(childhoodShots)}
          onOpen={setShot}
        />

        <Chapter
          title="The printed ones"
          note="Real photographs, from before anything was on a phone. Somebody kept these in a frame for twenty years."
          shots={pick(kidPrints)}
          onOpen={setShot}
        />

        <Chapter
          title="College"
          note="Uniforms, ID cards, back benches, and the physics teacher she actually liked."
          shots={pick(schoolShots)}
          onOpen={setShot}
        />

        {chapters.map((c) => (
          <Chapter key={c.title} title={c.title} note={c.note} shots={pick(c.shots)} onOpen={setShot} />
        ))}

        {newChapters.map((c) => (
          <Chapter key={c.title} title={c.title} note={c.note} shots={pick(c.shots)} onOpen={setShot} />
        ))}

        {augChapters.map((c) => (
          <Chapter key={c.title} title={c.title} note={c.note} shots={pick(c.shots)} onOpen={setShot} />
        ))}

        <Chapter
          title="Six I keep coming back to"
          note="No theme, no year, no reason — just the six photos I open first every time I go looking."
          shots={pick(wallShots)}
          onOpen={setShot}
        />

        <Chapter
          title="Saree days"
          note="Traditional day at college, festivals at home, temples in Belagavi. This is the version of her that North Karnataka made."
          shots={pick(sareeShots)}
          onOpen={setShot}
        />

        <Chapter
          title="The one who sings"
          note="Half the time she doesn't know she's doing it — a line of some sad song, under her breath, in the middle of a sentence."
          shots={pick(singShots)}
          onOpen={setShot}
        />

        <SingingPlayer />


        {isHer ? (
          <>
        <Chapter
          title="Misty"
          note="Daa's dog on paper. Hers in every photo — he gets more of her attention than any human alive, and deserves it."
          shots={pick(mistyShots)}
          onOpen={setShot}
        />

        <Chapter
          title="Our calls"
          note="Screenshots she doesn't know I took. Half of them mid-sentence, all of them at some ridiculous hour."
          shots={pick(callShots)}
          onOpen={setShot}
        />
          </>
        ) : null}

        <Chapter
          title="Her 20th, Bday 2025"
          note="Last year's one — sash, cake, and a sparkler and all of her."
          shots={pick(lastBirthdayShots)}
          onOpen={setShot}
        />

        <Chapter
          title="Straight off her story"
          note="The ones that showed up on my phone, got saved, and never got deleted."
          shots={pick(storyShots)}
          onOpen={setShot}
        />

        {isHer ? (
          <>
            <DaaSection onOpen={setShot} />
            <UsSection onOpen={setShot} />
            <Remember />
            <Letter />
          </>
        ) : null}
          </>
        )}


        <footer className="px-5 pb-16 text-center">
          <p className="font-hand text-2xl text-muted-foreground">
            {isGuest
              ? "made in the dark, at 00:00 IST"
              : isHer
                ? "made in the dark, at 00:00 IST, for one short girl from Ainapur"
                : "made in the dark, at 00:00 IST, for Aishwarya — from all of us"}
          </p>
        </footer>
      </main>

      <Lightbox shot={shot} onClose={() => setShot(null)} />
    </>
  );
}
