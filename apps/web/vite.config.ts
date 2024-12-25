import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react-swc";
import { version } from "./package.json";
import { short as gitShort } from "git-rev";

const commitHash = await new Promise(gitShort);
const appVersion = `${version}+${commitHash}`;

// Data to be injected into the html template
const htmlData = {
  name: "Cardfolio",
  description: "A simple trading card collection manager",
  version: appVersion,
};

export default defineConfig(({ mode }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
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
  esbuild: {
    pure: ["console.log", "console.info", "console.debug"],
  },
}));
