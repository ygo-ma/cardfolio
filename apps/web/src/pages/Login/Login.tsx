import { Link, useLocation, useNavigate } from "react-router";
import { FieldValues, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";

import styles from "./Login.module.css";

import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";
import FormField from "../../components/FormField";
import { useUser } from "../../stores/user";
import { AuthError, UserBackend } from "../../backends";

function LoginPage() {
  const { t } = useTranslation("common");
  const { state } = useLocation();
  const user = useUser(false);
  const navigate = useNavigate();

  // Redirect the user if they successfully log in
  useEffect(() => {
    if (user) {
      navigate(state?.redirect ?? "/");
    }
  }, [navigate, state, user]);

  // TODO: Implement field errors
  const [fieldErrors] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const { register, handleSubmit, formState } = useForm();

  // TODO: Implement flash messages

  const onSubmit = async ({ email, password }: FieldValues) => {
    setProcessing(true);

    try {
      // Simply logging in will trigger the event
      // to automatically update the user store (across all tabs)
      await UserBackend.login(email, password);
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
          components={[
            <Link
              to="/forgot_password"
              state={{ redirect: state?.redirect }}
            />,
          ]}
        />
      </div>
      <SubmitButton label={t("login.login_button")} processing={processing} />
      <div>
        <Trans
          i18nKey="login.need_account"
          components={[
            <Link to="/signup" state={{ redirect: state?.redirect }} />,
          ]}
        />
      </div>
    </form>
  );
}

export default LoginPage;
