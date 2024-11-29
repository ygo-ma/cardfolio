import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "../components/Home";

import "../assets/style/main.css";
import "./setupI18n.ts";
import Collection from "../components/Collection";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
