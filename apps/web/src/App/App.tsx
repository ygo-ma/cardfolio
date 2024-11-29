import { Suspense } from "react";

import Home from "../components/Home";

import "../assets/style/main.css";
import "./setupI18n.ts";

function App() {
  return (
    <>
      <Suspense fallback="Loading...">
        <Home />
      </Suspense>
    </>
  );
}

export default App;
