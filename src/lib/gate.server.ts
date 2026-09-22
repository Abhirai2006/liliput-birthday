/** Kept out of the client bundle — the page never ships the passwords. */
export const GATE_PASSWORD = "frompappa";
export const FAMILY_PASSWORD = "dcprincess";

export type Audience = "guest" | "family" | "her";

export function checkGate(input: string) {
  return input.trim().toLowerCase() === GATE_PASSWORD;
}

/** Which version of the page the typed word unlocks. */
export function levelFor(input: string): Audience | null {
  const word = input.trim().toLowerCase();
  if (word === GATE_PASSWORD) return "her";
  if (word === FAMILY_PASSWORD) return "family";
  return null;
}
