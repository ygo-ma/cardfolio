import { useEffect } from "react";
import { type FallbackProps } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router";
import { LoginRequiredError } from "../../stores/user";

function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (error instanceof LoginRequiredError) {
      resetErrorBoundary();
      navigate("/login", { state: { redirect: pathname }, replace: true });
    }
  }, [error, pathname, navigate, resetErrorBoundary]);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

// Prevent ErrorBoundary errors from being logged to the console
const ignoredErrors = new Set(["LoginRequiredError"]);

// Errors are still logged if using only one of the following methods
const originalConsoleError = console.error;
console.error = (error: unknown, ...args: unknown[]) => {
  if (error instanceof Error && ignoredErrors.has(error?.name)) {
    return;
  }

  originalConsoleError(error, ...args);
};

window.addEventListener("error", (event: ErrorEvent) => {
  if (ignoredErrors.has(event.error?.name)) {
    event.preventDefault();
  }
});

export default ErrorPage;
