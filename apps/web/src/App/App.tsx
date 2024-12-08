import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import ErrorPage from "../components/ErrorPage";
import MainLayout from "../components/MainLayout";
import LoginLayout from "../components/LoginLayout";

import HomePage from "../pages/Home";
import CollectionPage from "../pages/Collection";
import LoginPage from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFoundPage from "../pages/NotFound";

import "../assets/style/main.css";
import "./setupI18n.ts";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" index element={<HomePage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<LoginLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
