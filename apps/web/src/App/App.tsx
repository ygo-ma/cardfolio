import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "../components/Home";

import "../assets/style/main.css";
import "./setupI18n.ts";
import Collection from "../components/Collection";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
