import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

function Header() {
  const { t } = useTranslation("common");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>{t("cardfolio_title")}</h1>
        <div className={styles.separator}></div>
        <div className={styles.search}>
          <button>{t("search")}</button>
        </div>
        <div className={styles.userButtons}>
          <button>{t("login")}</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
