import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { showReportDialog, type FallbackProps } from "../../App/setupSentry";
import { LoginRequiredError, useUserStore } from "../../stores/user";
import { ignoredErrors } from "../../utils";
import { useTranslation } from "react-i18next";

function ErrorPage({ error, resetError }: FallbackProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserStore();
  const { t } = useTranslation("common");

  const restartApp = () => {
    window.location.href = "/";
  };

  const reportError = useCallback(() => {
    showReportDialog({
      user: {
        email: user?.email,
      },
    });
  }, [user]);

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (error instanceof LoginRequiredError) {
      resetError();
      navigate("/login", { state: { redirect: pathname }, replace: true });
    }
  }, [error, pathname, navigate, resetError]);

  return (
    <div role="alert">
      <p>{t("error.boundary_title", { default: "Something went wrong" })}</p>
      {error instanceof Error && <pre>{error.message}</pre>}
      <p>
        <button onClick={restartApp}>
          {t("error.restart_button", { default: "Restart the app" })}
        </button>
        <button onClick={reportError}>
          {t("error.report_button", { default: "File a crash report" })}
        </button>
      </p>
    </div>
  );
}

// Prevent ErrorBoundary errors from being logged to the console
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
