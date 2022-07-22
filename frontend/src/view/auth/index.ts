import i18n from '../../config/i18n/i18n';
import i18nAuth from './i18n/eng.json';

i18n.addResourceBundle('eng', 'auth', i18nAuth);

export { default as LoginPopup } from './LoginPopup';
export { default as SignupPopup } from './SignupPopup';
