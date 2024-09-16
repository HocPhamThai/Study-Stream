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
import PROFILE_EN from '../locales/en/profile.json'
import PROFILE_VI from '../locales/vi/profile.json'
import CHAT_EN from '../locales/en/chat.json'
import CHAT_VI from '../locales/vi/chat.json'
import CHATBOT_EN from '../locales/en/chatbot.json'
import CHATBOT_VI from '../locales/vi/chatbot.json'
import ANALYTICS_EN from '../locales/en/analytics.json'
import ANALYTICS_VI from '../locales/vi/analytics.json'
import NAVBAR_EN from '../locales/en/navbar.json'
import NAVBAR_VI from '../locales/vi/navbar.json'
import POMODORO_EN from '../locales/en/pomodoro.json'
import POMODORO_VI from '../locales/vi/pomodoro.json'
import LOGIN_EN from '../locales/en/login.json'
import LOGIN_VI from '../locales/vi/login.json'
import RCMLIST_EN from '../locales/en/recommend_list.json'
import RCMLIST_VI from '../locales/vi/recommend_list.json'
import LEARNING_SPACE_EN from '../locales/en/learning_space.json'
import LEARNING_SPACE_VI from '../locales/vi/learning_space.json'
import STUDYROOM_EN from '../locales/en/studyroom.json'
import STUDYROOM_VI from '../locales/vi/studyroom.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    getStarted: GET_STARTED_EN,
    dashhome: DASHHOME_EN,
    learning: LEARNING_EN,
    focus: FOCUS_EN,
    profile: PROFILE_EN,
    chat: CHAT_EN,
    chatbot: CHATBOT_EN,
    analytics: ANALYTICS_EN,
    navbar: NAVBAR_EN,
    pomodoro: POMODORO_EN,
    login: LOGIN_EN,
    rcmList: RCMLIST_EN,
    learningSpace: LEARNING_SPACE_EN,
    studyroom: STUDYROOM_EN
  },
  vi: {
    getStarted: GET_STARTED_VI,
    dashhome: DASHHOME_VI,
    learning: LEARNING_VI,
    focus: FOCUS_VI,
    profile: PROFILE_VI,
    chat: CHAT_VI,
    chatbot: CHATBOT_VI,
    analytics: ANALYTICS_VI,
    navbar: NAVBAR_VI,
    pomodoro: POMODORO_VI,
    login: LOGIN_VI,
    rcmList: RCMLIST_VI,
    learningSpace: LEARNING_SPACE_VI,
    studyroom: STUDYROOM_VI
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