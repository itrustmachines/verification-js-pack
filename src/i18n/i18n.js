import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import tw from './zh-TW.json'
import en from './en.json'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: en,
            },
            'zh-TW': {
                translations: tw,
            },
        },
        lng: 'zh-TW',
        fallbackLng: 'zh-TW',
        debug: true,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
