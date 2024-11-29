import { useLocation, useNavigate } from "react-router";
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
        <label htmlFor="email">
          {t("email_label")}
          <input type="email" name="email" required />
        </label>
        <label htmlFor="password">
          {t("password_label")}
          <input type="password" name="password" required />
        </label>
        <button type="submit">{t("login_button")}</button>
      </form>
    </>
  );
}

export default LoginPage;
