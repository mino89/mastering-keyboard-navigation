import { defineConfig } from "vite";
import vituum from "vituum";
import posthtml from "@vituum/vite-plugin-posthtml";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [
    tailwindcss(),
    vituum(),
    posthtml({
      root: "./src",
    }),
  ],
});
