import { PropsWithChildren } from "react";
import styles from "./FormField.module.css";

export type FormFieldProps = PropsWithChildren<{
  asLabel: true;
}>;

function FormField({ asLabel, children }: FormFieldProps) {
  return asLabel ? (
    <label className={styles.formField}>{children}</label>
  ) : (
    <div className={styles.formField}>{children}</div>
  );
}

export default FormField;
