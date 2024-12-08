import { Link, useNavigate } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { useForm, FieldValues } from "react-hook-form";
import { useMemo, useState } from "react";

import styles from "./SignUp.module.css";

import { userBackend, AuthError } from "../../backends";
import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";
import FormField from "../../components/FormField";

function SignUp() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async ({ email, password }: FieldValues) => {
    setProcessing(true);

    try {
      await userBackend.create(email, password, password);
      navigate("/login", { state: { flash: "signup_success" } });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.code) {
          case "auth.weak_password":
            setServerErrors({ password: "auth.weak_password" });
            break;
          case "auth.user_already_exists":
            setServerErrors({ email: "auth.user_already_exists" });
            break;
          default:
            console.error(error);
        }
      } else {
        console.error(error);
      }
    }

    setProcessing(false);
  };

  const errors: Record<string, string | undefined> = useMemo(
    () => ({
      ...serverErrors,
      ...Object.fromEntries(
        Object.entries(formState.errors).map(([key, value]) => [
          key,
          value?.message?.toString(),
        ]),
      ),
    }),
    [formState, serverErrors],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          {...register("password", {
            minLength: { value: 6, message: "auth.weak_password" },
          })}
        />
      </FormField>
      <FormField error={errors.passwordConfirm && t(errors.passwordConfirm)}>
        <TextInput
          label={t("login.password_confirm_label")}
          type="password"
          required
          {...register("passwordConfirm", {
            minLength: { value: 6, message: "auth.weak_password" },
            validate: {
              passwordMismatch: (value, formValues) =>
                value === formValues.password || "auth.password_mismatch",
            },
          })}
        />
      </FormField>
      <SubmitButton label={t("login.signup_button")} processing={processing} />
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
