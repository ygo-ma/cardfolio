import styles from "./SubmitButton.module.css";

export type SubmitButtonProps = {
  label: string;
  processing?: boolean;
};

function SubmitButton({ label, processing }: SubmitButtonProps) {
  return (
    <button className={styles.button} type="submit">
      {label} {processing && "⌛"}
    </button>
  );
}

export default SubmitButton;
