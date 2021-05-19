import i18next from 'i18next';
import XHR from 'i18next-xhr-backend'; // https://github.com/i18next/i18next-xhr-backend
import LngDetector from 'i18next-browser-languagedetector'; // https://github.com/i18next/i18next-browser-languageDetector

export default () => {
  i18next
    .use(LngDetector)
    .use(XHR)
    .init({
      fallbackLng: 'en',
      ns: ['translations', 'privacy', 'termsofuse', 'serverMessages', 'tooltips'],
      interpolation: {prefix: '{{', suffix: '}}'},
      detection: {},
      backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      react: {
        wait: true,
        withRef: false,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
        translateFuncName: 't',
        useSuspense: false
      }
    }, function(err) {
      if (err) {
        console.warn(err); // eslint-disable-line no-console
      }
    });
  return i18next;
};
