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
import PolaroidWall from "@/components/PolaroidWall";
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
  const [state, setState] = useState<"loading" | "locked" | "open">(
    SEAL_ENABLED ? "loading" : "open",
  );
  const [lit, setLit] = useState(true);
  const [shot, setShot] = useState<Shot | null>(null);

  useEffect(() => {
    if (!SEAL_ENABLED) return;
    setState(msUntilBirthday() <= 0 || hasPreviewKey() ? "open" : "locked");
  }, []);

  const unlock = useCallback(() => setState("open"), []);

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

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <StarField density={0.9} />
      </div>

      <main className="overflow-x-clip">
        <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-[0.65rem] uppercase tracking-[0.45em] text-primary"
          >
            18 September · she turns 21
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="mt-5 text-5xl leading-[1.05] text-glow sm:text-7xl"
          >
            Happy Birthday,
            <span className="block italic text-primary">Subbi</span>
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
              ? "One candle, one wish. Take your time, lilliput."
              : "Wish made. Now scroll — the whole night is about you."}
          </motion.p>
        </section>

        <AgeReveal />

        <AboutHer onOpen={setShot} />

        <Chapter
          title="Before she was Subbi"
          note="Ainapur, two plaits, and a girl who already knew how to pose. These are the oldest photos I have of her."
          shots={childhoodShots}
          onOpen={setShot}
        />

        <Chapter
          title="The printed ones"
          note="Real photographs, from before anything was on a phone. Somebody kept these in a frame for twenty years."
          shots={kidPrints}
          onOpen={setShot}
        />

        <Chapter
          title="School, not college"
          note="Uniforms, benches, a physics teacher she actually liked, and one birthday party she still brings up."
          shots={schoolShots}
          onOpen={setShot}
        />

        {chapters.map((c) => (
          <Chapter key={c.title} title={c.title} note={c.note} shots={c.shots} onOpen={setShot} />
        ))}

        <PolaroidWall shots={wallShots} onOpen={setShot} />

        {newChapters.map((c) => (
          <Chapter key={c.title} title={c.title} note={c.note} shots={c.shots} onOpen={setShot} />
        ))}

        {augChapters.map((c) => (
          <Chapter key={c.title} title={c.title} note={c.note} shots={c.shots} onOpen={setShot} />
        ))}

        <Chapter
          title="Saree days"
          note="Traditional day at college, festivals at home, temples in Belagavi. This is the version of her that North Karnataka made."
          shots={sareeShots}
          onOpen={setShot}
        />

        <SingingPlayer />

        <Chapter
          title="Misty"
          note="The dog who gets more of her attention than any human alive, and deserves it."
          shots={mistyShots}
          onOpen={setShot}
        />

        <Chapter
          title="Our calls"
          note="Screenshots she doesn't know I took. Half of them mid-sentence, all of them at some ridiculous hour."
          shots={callShots}
          onOpen={setShot}
        />

        <DaaSection onOpen={setShot} />
        <UsSection onOpen={setShot} />
        <Remember />
        <Letter />


        <footer className="px-5 pb-16 text-center">
          <p className="font-hand text-2xl text-muted-foreground">
            made in the dark, at 00:00 IST, for one short girl from Ainapur
          </p>
        </footer>
      </main>

      <Lightbox shot={shot} onClose={() => setShot(null)} />
    </>
  );
}
