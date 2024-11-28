import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

// Fetch all locale files
const langModules = import.meta.glob("../assets/locale/*/*.json");
const supportedLanguages = new Set(
  Object.keys(langModules).map((key) => key.split("/")[3] as string),
);

console.debug("Supported languages: ", supportedLanguages);

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      console.debug(`Fetching locale files for ${language}/${namespace}`);

      const key = `../assets/locale/${language}/${namespace}.json`;
      const moduleFunc = langModules[key];
      if (!moduleFunc) {
        const error = new Error(
          `No locale file found for ${language}/${namespace}`,
        );
        error.name = "LocaleNotFoundError";
        throw error;
      }

      const { default: localeData } = (await moduleFunc()) as {
        default: Record<string, string>;
      };

      return localeData;
    }),
  )
  .init({
    ns: "common",
    defaultNS: "common",
    fallbackLng: "en",
    supportedLngs: [...supportedLanguages],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// Change the value of the `lang` attribute for the tag element
// This is important because the browser uses it to change a lot of things
// like which glyphs to use in asian languages, or which accents for text-to-speech
i18n.on("languageChanged", (newLanguage) => {
  console.debug(`Changing lang attribute to ${newLanguage}`);
  document.documentElement.setAttribute("lang", newLanguage);
});
