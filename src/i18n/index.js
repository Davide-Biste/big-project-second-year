import _ from "lodash";
import en from "./en.json";
import it from "./it.json";
import { locale } from "expo-localization";

const translations = {
  it,
  en,
};

const fallback = "en";

const bestLanguage = _.split(locale, "-")[0];
/*const bestLanguage = "en";*/

const language = _.includes(_.keys(translations), bestLanguage)
  ? bestLanguage
  : fallback;

export function translate(name) {
  return _.get(
    translations,
    [language, name],
    _.get(translations, [fallback, name], name)
  );
}
