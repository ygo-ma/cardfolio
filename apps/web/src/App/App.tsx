import { Suspense } from "react";
import { BrowserRouter, Route } from "react-router";

import ErrorPage from "../components/ErrorPage";
import MainLayout from "../components/MainLayout";
import LoginLayout from "../components/LoginLayout";

import HomePage from "../pages/Home";
import CollectionPage from "../pages/Collection";
import LoginPage from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFoundPage from "../pages/NotFound";
import CrashTest from "../pages/CrashTest";

import "../assets/style/main.css";
import "./setupI18n.ts";
import { SentryRoutes, ErrorBoundary } from "./setupSentry.ts";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <ErrorBoundary fallback={ErrorPage}>
          <SentryRoutes>
            <Route>
              <Route path="/crashtest" element={<CrashTest />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" index element={<HomePage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<LoginLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </SentryRoutes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
