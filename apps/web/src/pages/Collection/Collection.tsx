import { useTranslation } from "react-i18next";
import { useUser } from "../../stores/user";

function Collection() {
  const { t } = useTranslation("common");
  const user = useUser();

  return (
    <>
      <h2>{t("collection")}</h2>
      <p>{t("hello_message", { name: user.name })}</p>
    </>
  );
}

export default Collection;
