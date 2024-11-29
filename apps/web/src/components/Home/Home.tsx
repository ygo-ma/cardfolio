import { useTranslation } from "react-i18next";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";

function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Header />
      <Body>
        <p>{t("hello_message")}</p>
      </Body>
      <Footer />
    </>
  );
}

export default Home;
