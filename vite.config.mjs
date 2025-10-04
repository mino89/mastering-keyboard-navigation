import { defineConfig } from "vite";
import vituum from "vituum";
import posthtml from "@vituum/vite-plugin-posthtml";
import tailwindcss from "@tailwindcss/vite";
console.log(process.env.NODE_ENV);
export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/mastering-keyboard-navigation/"
      : "/",
  plugins: [
    tailwindcss(),
    vituum(),
    posthtml({
      root: "./src",
    }),
  ],
});
