import { useTranslation } from "react-i18next";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import { useUser } from "../../stores/user";

function Collection() {
  const { t } = useTranslation("common");
  const user = useUser();

  return (
    <>
      <Header />
      <Body>
        <h2>{t("collection")}</h2>
        <p>{t("hello_message", { name: user.name })}</p>
      </Body>
      <Footer />
    </>
  );
}

export default Collection;
