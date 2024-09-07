import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import GET_STARTED_EN from '../locales/en/get_started.json'
import GET_STARTED_VI from '../locales/vi/get_started.json'
import DASHHOME_EN from '../locales/en/dashome.json'
import DASHHOME_VI from '../locales/vi/dashome.json'
import LEARNING_EN from '../locales/en/learning.json'
import LEARNING_VI from '../locales/vi/learning.json'
import FOCUS_EN from '../locales/en/focus.json'
import FOCUS_VI from '../locales/vi/focus.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    getStarted: GET_STARTED_EN,
    dashhome: DASHHOME_EN,
    learning: LEARNING_EN,
    focus: FOCUS_EN
  },
  vi: {
    getStarted: GET_STARTED_VI,
    dashhome: DASHHOME_VI,
    learning: LEARNING_VI,
    focus: FOCUS_VI
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