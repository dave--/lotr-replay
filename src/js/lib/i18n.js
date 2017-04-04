import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from '../../locales/all.js';

i18n
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en',
		ns: ['common', 'editing', 'gameTerms', 'cards'],
		defaultNS: 'common',
		resources,
		debug: process.env.NODE_ENV !== 'production',
		interpolation: {
			escapeValue: false // not needed for react
		},
		detection: {
			order: ['localStorage', 'navigator'], // order and from where user language should be detected
			lookupLocalStorage: 'i18nextLng', // keys or params to lookup language from
			caches: ['localStorage'] // cache user language on
		}
	});

i18n.setStore = (store) => {
	// Subscribe to changes in language
	const unsubscribe = store.subscribe(() => {
		const newLng = store.getState().lngs.filter((item) => item.active);

		if (newLng.length && newLng[0].locale !== i18n.language) {
			i18n.changeLanguage(newLng[0].locale);
		}
	})

	// initialize store with current language
	store.dispatch({
		type: 'SET_LANGUAGE',
		locale: i18n.language
	})

	// return function to remove store again
	return unsubscribe;
}

export default i18n;