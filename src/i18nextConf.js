import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from "./locales/en/translation.json"
import translationTR from "./locales/tr/translation.json"

const resources = {
    en: {
      translation: translationEN
    },
    tr: {
      translation: translationTR
    }
};


export const LANGUAGES = [
  {
    name: 'Türkçe',
    code: 'tr'
  },
  {
    name: 'English',
    code: 'en'
  }
];


const DEFAULT_LANGUAGE = 'tr';

const initial = {
    default: localStorage.hasOwnProperty('language') ?  
    localStorage.getItem('language') : DEFAULT_LANGUAGE,
    languages:["tr","en"]
};


const fallbackLng = [initial.default]
const availableLanguages = initial.languages

i18n
  //.use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng, // fallback language is english.

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: false,

    whitelist: availableLanguages,
    locales: availableLanguages,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;