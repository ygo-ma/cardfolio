import { Outlet } from "react-router";
import Logo from "../Logo";

import styles from "./LoginLayout.module.css";

function LoginLayout() {
  return (
    <div className={styles.wrapper}>
      <header>
        <Logo link />
      </header>
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
}

export default LoginLayout;
