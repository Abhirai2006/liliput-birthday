import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({ password: z.string().max(200) });

export const verifyGate = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { checkGate } = await import("./gate.server");
    return { ok: checkGate(data.password) };
  });
