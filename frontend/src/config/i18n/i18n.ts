import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import i18neng from './i18n-eng.json';

i18n
	.use(initReactI18next)
	.init({
		resources: {
			eng: {
				translation: i18neng,
			},
		},
		lng: 'eng',
		react: {
			useSuspense: false,
		},

	}).then();

export default i18n;
