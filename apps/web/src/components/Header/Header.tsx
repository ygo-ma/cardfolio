import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router";
import { MouseEventHandler } from "react";

import styles from "./Header.module.css";

import { useUser } from "../../stores/user";
import { AuthBackend } from "../../backends";

function Header() {
  const { t } = useTranslation("common");
  const user = useUser(false);
  const navigate = useNavigate();

  const logout: MouseEventHandler<HTMLAnchorElement> = async (event) => {
    event.preventDefault();

    await AuthBackend.logout();

    navigate("/");
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
