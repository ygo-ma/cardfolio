import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer>
      <p className={styles.container}>{t("copyright", { year: "2024" })}</p>
    </footer>
  );
}

export default Footer;
