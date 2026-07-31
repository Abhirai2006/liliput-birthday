// 18 September 2026, 00:00 IST  ->  17 September 2026, 18:30 UTC
export const BIRTHDAY_UTC = Date.UTC(2026, 8, 17, 18, 30, 0);

export function msUntilBirthday(now = Date.now()) {
  return BIRTHDAY_UTC - now;
}

export function splitDuration(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/** Dev/preview escape hatch: ?open=subbi lets him check the site before the day. */
export function hasPreviewKey() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("open") === "subbi";
}
