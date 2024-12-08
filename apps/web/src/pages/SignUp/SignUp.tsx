import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "../../stores/user";
import { Trans, useTranslation } from "react-i18next";

import styles from "./SignUp.module.css";

import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";

function SignUp() {
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
      <TextInput
        label={t("login.password_confirm_label")}
        type="password"
        name="password_confirm"
        required
      />
      <SubmitButton label={t("login.signup_button")} expand />
      <div>
        <Trans
          i18nKey="login.already_have_account"
          components={[<Link to="/login" />]}
        />
      </div>
    </form>
  );
}

export default SignUp;
