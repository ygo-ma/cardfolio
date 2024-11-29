import { useEffect } from "react";
import { type FallbackProps } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router";
import { UserNotLoggedInError } from "../../stores/user";

// Prevent recognized errors from being logged to the console
window.addEventListener("error", (event: ErrorEvent) => {
  if (event.error instanceof UserNotLoggedInError) {
    event.preventDefault();
  }
});

function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (error instanceof UserNotLoggedInError) {
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

export default ErrorPage;
