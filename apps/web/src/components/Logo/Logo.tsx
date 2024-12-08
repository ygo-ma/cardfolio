import { Link } from "react-router";
import styles from "./Logo.module.css";

export type LogoProps = {
  link?: boolean | string;
};

function Logo({ link }: LogoProps) {
  if (link === true) {
    link = "/";
  }

  const content = link ? <Link to={link}>Cardfolio</Link> : "Cardfolio";

  return <h1 className={styles.logo}>{content}</h1>;
}

export default Logo;
