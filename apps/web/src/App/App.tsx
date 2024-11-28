import Home from "../Home";
import { Suspense } from "react";

import "./setupI18n";

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
