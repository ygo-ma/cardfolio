import { createHtmlPlugin } from "vite-plugin-html";
import { version } from "./package.json";

// Data to be injected into the html template
const htmlData = {
  title: "Cardfolio",
  description: "A simple trading card collection manager",
  version,
};

export default {
  plugins: [
    createHtmlPlugin({
      entry: "src/main.ts",
      inject: { data: htmlData },
    }),
  ],
};
