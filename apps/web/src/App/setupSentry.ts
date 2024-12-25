import {
  createRoutesFromChildren,
  matchRoutes,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router";
import {
  type FallbackRender,
  init,
  reactRouterV7BrowserTracingIntegration,
  withSentryReactRouterV7Routing,
} from "@sentry/react";

import { ignoredErrors } from "../utils";
import { useEffect } from "react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
if (SENTRY_DSN) {
  init({
    dsn: SENTRY_DSN,
    environment:
      import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE,
    integrations: [
      reactRouterV7BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    ignoreErrors: [...ignoredErrors],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs
    // distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/(.+\.)?cardfolio\.app/],
  });
}

export { ErrorBoundary, showReportDialog, setUser } from "@sentry/react";
export type FallbackProps = Parameters<FallbackRender>[0];
export const SentryRoutes = withSentryReactRouterV7Routing(Routes);
