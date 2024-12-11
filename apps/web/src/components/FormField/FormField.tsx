import { PropsWithChildren } from "react";

import styles from "./FormField.module.css";

export type FormFieldProps = PropsWithChildren<{
  error?: string;
}>;

export default function FormField({ children, error }: FormFieldProps) {
  return (
    <div>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
