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

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    createHtmlPlugin({
      entry: "src/main.tsx",
      inject: { data: htmlData },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[hash].[ext]",
        chunkFileNames: "assets/[hash].js",
        entryFileNames: "assets/[hash].js",
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName:
        mode === "production"
          ? "[hash:base64:7]"
          : "[name]__[local]__[hash:base64:5]",
    },
  },
}));
