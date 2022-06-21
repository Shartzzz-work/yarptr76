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
        works: resolve(__src, "works", "index.html"),
        beregoukreplenie: resolve(__src, "beregoukreplenie", "index.html"),
        oborudovanie_i_snaryazhenie: resolve(__src, "oborudovanie_i_snaryazhenie", "index.html"),
        obsledovanie_i_ochistka_dna_akvatorii: resolve(__src, "obsledovanie_i_ochistka_dna_akvatorii", "index.html"),
        obsledovanie_i_remont_gidrotehnicheskih_sooruzhenij: resolve(__src, "obsledovanie_i_remont_gidrotehnicheskih_sooruzhenij", "index.html"),
        obsledovanie_i_remont_truboprovoda_kabelnoj_linii_svyazy: resolve(__src, "obsledovanie_i_remont_truboprovoda_kabelnoj_linii_svyazy", "index.html"),
        obsledovanie_podvodnoj_chasti_sudov: resolve(__src, "obsledovanie_podvodnoj_chasti_sudov", "index.html"),
        podvodnaya_videosemka: resolve(__src, "podvodnaya_videosemka", "index.html"),
        poisk_i_podjem_objektov_sudopodjem: resolve(__src, "poisk_i_podjem_objektov_sudopodjem", "index.html"),
      },
    },
  },

  plugins: [nunjucks()],
});
