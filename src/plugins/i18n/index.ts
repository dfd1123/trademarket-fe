import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ko from './locales/ko';

console.log(en)

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      ko: ko
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    ns:'data',
    defaultNS: 'data',
    interpolation: {
      escapeValue: false,
    },
  });
  

export default i18n;
