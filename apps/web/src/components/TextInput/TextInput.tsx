import styles from "./TextInput.module.css";
import classnames from "classnames";

export type TextInputProps = {
  label?: string;
  type?: "text" | "email" | "password";
  name?: string;
  required?: boolean;
};

function TextInput({ label, type = "text", name, required }: TextInputProps) {
  const hasLabel = label !== undefined;

  const input = (
    <input
      className={classnames(styles.input, {
        [styles.hasLabel!]: hasLabel,
      })}
      type={type}
      name={name}
      required={required}
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
}

export default TextInput;
