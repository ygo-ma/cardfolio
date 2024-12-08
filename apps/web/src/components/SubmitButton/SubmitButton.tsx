import classNames from "classnames";

import styles from "./SubmitButton.module.css";

export type SubmitButtonProps = {
  label: string;
  expand?: boolean;
};

function SubmitButton({ label, expand }: SubmitButtonProps) {
  return (
    <button
      className={classNames(styles.button, { [styles.expand!]: expand })}
      type="submit"
    >
      {label}
    </button>
  );
}

export default SubmitButton;
