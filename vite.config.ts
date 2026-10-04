// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

// The dev-only devtools plugin injects `data-tsd-source` attributes into every JSX
// element. React Three Fiber tries to set that prop on three.js objects and throws
// ("Cannot set \"data-tsd-source\""), blanking the 3D scene. Strip the attribute back
// out of R3F component files after the injection runs.
function stripSourceTagsFrom3D(): Plugin {
  return {
    name: "strip-tsd-source-from-r3f",
    enforce: "post",
    apply: "serve",
    transform(code, id) {
      if (!/CandleScene\.tsx/.test(id)) return null;
      if (!code.includes("data-tsd-source")) return null;
      return {
        code: code.replace(/"data-tsd-source":\s*"[^"]*",?/g, ""),
        map: null,
      };
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [stripSourceTagsFrom3D()],
    // Keep the Three.js graph out of Vite's dev pre-bundle. Re-optimization can
    // otherwise invalidate CandleScene's generated chunk while the page is open.
    optimizeDeps: {
      exclude: ["three"],
    },
  },
});
