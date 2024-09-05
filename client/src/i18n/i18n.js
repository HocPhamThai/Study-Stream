import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import GET_STARTED_EN from '../locales/en/get_started.json'
import GET_STARTED_VI from '../locales/vi/get_started.json'


export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    getStarted: GET_STARTED_EN
  },
  vi: {
    getStarted: GET_STARTED_VI
  }
}

const defaultNS = 'getStarted'
const savedLanguage = (localStorage.getItem('language') || 'vi').toLowerCase();

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  ns: ['getStarted'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapseValue: false
  }
})