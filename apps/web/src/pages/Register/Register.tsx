import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { userBackend, AuthError } from "../../backends";
import styles from "./Register.module.css";
import FormField from "../../components/FormField";

type OperationState = "idle" | "loading" | "success" | "error";

function Register() {
  const { t } = useTranslation();
  const [operationState, setOperationState] = useState<OperationState>("idle");
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const { register, handleSubmit, formState } = useForm();

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

  const onSubmit = async ({ email, password }: FieldValues) => {
    setOperationState("loading");

    try {
      await userBackend.create(email, password, password);

      setOperationState("success");
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.code) {
          case "auth.weak_password":
            setServerErrors({ password: "error.weak_password" });
            break;
          case "auth.user_already_exists":
            setServerErrors({ email: "error.user_already_exists" });
            break;
          default:
            console.error(error);
        }
      } else {
        console.error(error);
      }

      setOperationState("error");
    }
  };

  return (
    <>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("register")}</h2>
        <FormField asLabel>
          {t("login.email_label")}
          <input type="email" required {...register("email")} />
          {errors.email && <span>{t(errors.email)}</span>}
        </FormField>
        <FormField asLabel>
          {t("login.password_label")}
          <input
            type="password"
            required
            {...register("password", {
              minLength: { value: 6, message: "error.weak_password" },
            })}
          />
          {errors.password && <span>{t(errors.password)}</span>}
        </FormField>
        <FormField asLabel>
          {t("login.password_confirm_label")}
          <input
            type="password"
            required
            {...register("passwordConfirm", {
              minLength: { value: 6, message: "error.weak_password" },
              validate: {
                passwordMismatch: (value, formValues) =>
                  value === formValues.password || "error.passwordMismatch",
              },
            })}
          />
          {errors.passwordConfirm && <span>{t(errors.passwordConfirm)}</span>}
        </FormField>

        <p>
          <button type="submit">
            {t("login.register_button")} {operationState}
          </button>
        </p>
        <p>
          <Link to="/login">{t("login.login_link")}</Link>
        </p>
      </form>
    </>
  );
}

export default Register;
