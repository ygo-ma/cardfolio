import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "../../stores/user";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation("common");
  const userStore = useUserStore();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userStore.setUser({ name: "John Doe" });

    if (state && "redirect" in state) {
      navigate(state.redirect, { replace: true });
    }
  };

  return (
    <>
      <h2>{t("login")}</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">
            {t("login.email_label")}
            <input type="email" name="email" required />
          </label>
        </p>
        <p>
          <label htmlFor="password">
            {t("login.password_label")}
            <input type="password" name="password" required />
          </label>
        </p>
        <p>
          <button type="submit">{t("login.login_button")}</button>
        </p>
        <p>
          <Link to="/register">{t("login.register_link")}</Link>
        </p>
      </form>
    </>
  );
}

export default LoginPage;
