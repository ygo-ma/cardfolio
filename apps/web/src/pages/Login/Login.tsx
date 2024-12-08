import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "../../stores/user";
import { Trans, useTranslation } from "react-i18next";

import styles from "./Login.module.css";

import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextInput
        label={t("login.email_label")}
        type="email"
        name="email"
        required
      />
      <TextInput
        label={t("login.password_label")}
        type="password"
        name="password"
        required
      />
      <div>
        <Trans
          i18nKey="login.forgot_password"
          components={[<Link to="/forgot_password" />]}
        />
      </div>
      <SubmitButton label={t("login.login_button")} expand />
      <div>
        <Trans
          i18nKey="login.need_account"
          components={[<Link to="/signup" />]}
        />
      </div>
    </form>
  );
}

export default LoginPage;
