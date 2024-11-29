import styles from "./Body.module.css";

export type BodyProps = React.PropsWithChildren<unknown>;

function Body({ children }: BodyProps) {
  return <div className={styles.body}>{children}</div>;
}

export default Body;
