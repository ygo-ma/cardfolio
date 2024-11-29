import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import ErrorPage from "../components/ErrorPage";
import MainLayout from "../components/MainLayout";

import Home from "../pages/Home";
import Collection from "../pages/Collection";
import Login from "../pages/Login";

import "../assets/style/main.css";
import "./setupI18n.ts";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
