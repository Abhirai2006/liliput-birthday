/** Kept out of the client bundle — the page never ships the password. */
export const GATE_PASSWORD = "_aunty_";

export function checkGate(input: string) {
  return input.trim().toLowerCase() === GATE_PASSWORD;
}
