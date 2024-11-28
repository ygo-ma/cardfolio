import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";

const rootElement = document.getElementById("app")!;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
