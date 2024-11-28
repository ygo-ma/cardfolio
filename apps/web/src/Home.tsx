import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation("common");
  return (
    <div>
      <h1>{t("cardfolio_title")}</h1>
      <p>{t("hello_message")}</p>
    </div>
  );
}

export default Home;
