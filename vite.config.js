import { defineConfig } from "vite";
import nunjucks from "vite-plugin-nunjucks";
import { resolve } from "path";

const __src = resolve(__dirname, "src");
const __dist = resolve(__dirname, "dist");

export default defineConfig({
  root: __src,
  build: {
    outDir: __dist,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__src, "index.html"),
        team: resolve(__src, "team/index.html"),
      },
    },
  },

  plugins: [nunjucks()],
});
