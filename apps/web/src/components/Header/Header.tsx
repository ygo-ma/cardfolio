import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { NavLink } from "react-router";
import { useUser, useUserStore } from "../../stores/user";
import { MouseEventHandler } from "react";

function Header() {
  const { t } = useTranslation("common");
  const user = useUser(false);
  const { setUser } = useUserStore();

  const logout: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setUser(undefined);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/">
          <h1 className={styles.logo}>{t("cardfolio_title")}</h1>
        </NavLink>
        <div className={styles.separator}></div>
        <div className={styles.search}>
          <a href="#">{t("search")}</a>
        </div>
        <div className={styles.userButtons}>
          {user ? (
            <a href="#" onClick={logout}>
              {t("logout")}
            </a>
          ) : (
            <NavLink to="/login">{t("login")}</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
