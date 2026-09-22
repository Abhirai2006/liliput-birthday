import { useState } from "react";
import { motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import StarField from "./StarField";
import { verifyGate } from "@/lib/gate.functions";

export const GATE_KEY = "subbi-gate";

export default function PasswordGate({ onOpen }: { onOpen: () => void }) {
  const verify = useServerFn(verifyGate);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [wrong, setWrong] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !value) return;
    setBusy(true);
    setWrong(false);
    try {
      const res = await verify({ data: { password: value } });
      if (res.ok) {
        try {
          window.localStorage.setItem(GATE_KEY, "1");
        } catch {
          /* private mode — she'll just type it again */
        }
        onOpen();
        return;
      }
      setWrong(true);
      setValue("");
    } catch {
      setWrong(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 -z-10">
        <StarField density={1.3} />
      </div>
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--candle) 55%, transparent), transparent 70%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[0.7rem] uppercase tracking-[0.45em] text-muted-foreground"
      >
        Only for one person
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.15 }}
        className="mt-5 text-center text-4xl leading-[1.1] text-glow sm:text-6xl"
      >
        Say the word,
        <span className="block italic text-primary">lilliput</span>
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
        onSubmit={submit}
        className="mt-12 w-full max-w-sm"
      >
        <label htmlFor="gate" className="sr-only">
          Password
        </label>
        <input
          id="gate"
          type="password"
          autoFocus
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="who it's from — one word, no space"
          className="w-full rounded-xl border border-border bg-card/50 px-5 py-4 text-center font-hand text-2xl tracking-wide text-foreground outline-none backdrop-blur-sm transition placeholder:font-sans placeholder:text-sm placeholder:tracking-[0.2em] placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full rounded-xl border border-primary/40 bg-primary/15 px-5 py-3 text-[0.7rem] uppercase tracking-[0.35em] text-primary transition hover:bg-primary/25 disabled:opacity-50"
        >
          {busy ? "checking" : "open it"}
        </button>
        <p className="mt-5 min-h-5 text-center text-sm text-accent">
          {wrong ? "not it. \"from\" + the name you've called me since you were tiny." : ""}
        </p>
      </motion.form>

      <p className="mt-6 max-w-xs text-center text-xs leading-relaxed text-muted-foreground">
        If you're not Subbi, this page isn't for you.
      </p>
    </main>
  );
}
