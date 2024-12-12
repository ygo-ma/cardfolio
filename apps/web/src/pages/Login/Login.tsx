import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "../../stores/user";
import { Trans, useTranslation } from "react-i18next";

import styles from "./Login.module.css";

import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";
import FormField from "../../components/FormField";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AuthError, UserBackend } from "../../backends";

function LoginPage() {
  const { t } = useTranslation("common");
  const userStore = useUserStore();
  const { state } = useLocation();
  const navigate = useNavigate();

  // TODO: Implement field errors
  const [fieldErrors] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async ({ email, password }: FieldValues) => {
    setProcessing(true);

    try {
      const user = await UserBackend.login(email, password);
      userStore.setUser(user);

      if (state && "redirect" in state) {
        navigate(state.redirect, { replace: true });
      }
    } catch (error) {
      if (error instanceof AuthError && error.code !== undefined) {
        setFormErrors([error.code]);
      } else {
        console.error(error);
      }
    }

    setProcessing(false);
  };

  const errors: Record<string, string> = useMemo(
    () => ({
      ...fieldErrors,
      ...Object.fromEntries(
        Object.entries(formState.errors).map(([key, value]) => [
          key,
          value?.message?.toString() ?? "",
        ]),
      ),
    }),
    [formState, fieldErrors],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {formErrors.map((error) => (
        <div className={styles.formError} key={error}>
          {t(`auth.errors.${error}`)}
        </div>
      ))}
      <FormField error={errors.email && t(errors.email)}>
        <TextInput
          label={t("login.email_label")}
          type="email"
          required
          {...register("email")}
        />
      </FormField>
      <FormField error={errors.password && t(errors.password)}>
        <TextInput
          label={t("login.password_label")}
          type="password"
          required
          {...register("password")}
        />
      </FormField>
      <div>
        <Trans
          i18nKey="login.forgot_password"
          components={[<Link to="/forgot_password" />]}
        />
      </div>
      <SubmitButton label={t("login.login_button")} processing={processing} />
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
