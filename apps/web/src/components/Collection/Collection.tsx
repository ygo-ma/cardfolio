import { useTranslation } from "react-i18next";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";

function Collection() {
  const { t } = useTranslation("common");

  return (
    <>
      <Header />
      <Body>
        <h2>{t("collection")}</h2>
        <p>{t("hello_message")}</p>
      </Body>
      <Footer />
    </>
  );
}

export default Collection;
