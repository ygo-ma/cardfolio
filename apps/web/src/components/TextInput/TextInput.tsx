import { forwardRef } from "react";
import styles from "./TextInput.module.css";
import classnames from "classnames";

export type TextInputProps = {
  label?: string;
  type?: "text" | "email" | "password";
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function (
  { label, type = "text", name, required, value, onChange }: TextInputProps,
  ref,
) {
  const hasLabel = label !== undefined;

  const input = (
    <input
      className={classnames(styles.input, {
        [styles.hasLabel!]: hasLabel,
      })}
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );

  if (hasLabel) {
    return (
      <label className={styles.container}>
        <span className={styles.label}>{label}</span>
        {input}
      </label>
    );
  }

  return input;
});

export default TextInput;
