const language = (state = [
				{'locale': 'de', 'lng': 'deutsch', 'active': false},
				{'locale': 'en', 'lng': 'english', 'active': false}
			], action) => {
	switch (action.type) {
		case 'SET_LANGUAGE': // Set current language to active, all others to inactive
			const currentLng = state.filter((item) => item.active);

			if (currentLng.length && currentLng[0].locale === action.locale) { // see if it actually changed to avoid unecessary rerenders
				return state;
			}
			return state.map((item) => {
				if (item.locale === action.locale.substr(0, 2)) {
					return Object.assign({}, item, { 'active': true });
				} else if (item.active === true) {
					return Object.assign({}, item, { 'active': false });
				}
				return item;
			});
		default:
			return state;
	}
}

export default language