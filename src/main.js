import less from './style/main.less';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from './js/lib/i18n';
import Root from './js/Root';
import { createStore } from 'redux';
import reducers from './js/reducers';
import { load } from './js/lib/matchesLoader';

let store = createStore(reducers);
i18n.setStore(store);
console.log('start loading matches');
load('/matches.json', (err, data) => {
	if (err) {
		//console.error(err);
	}
	console.log('loaded matches: ',err, data);
	store.dispatch({
		type: 'SET_MATCHES',
		matches: data
	});
});

ReactDOM.render(
	<Root store={ store } i18n={ i18n } />,
	document.getElementById('app')
);