import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react-swc";
import { version } from "./package.json";

// Data to be injected into the html template
const htmlData = {
  name: "Cardfolio",
  description: "A simple trading card collection manager",
  version,
};

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      entry: "src/main.tsx",
      inject: { data: htmlData },
    }),
  ],
});
