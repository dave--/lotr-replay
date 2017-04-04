import React from 'react';
import { Router, browserHistory, hashHistory } from "react-router";
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import routes from './routes';
import { setCurrentStep } from './actions';

class Root extends React.Component {
	render() {
		const { t, store, i18n } = this.props;

		(process.env.NODE_ENV !== 'production' ? hashHistory : browserHistory).listen((location) => {
			if (location.pathname.substr(0, 7) === '/match/') {
				const match = +location.pathname.replace(/\/match\/(\d+)\/.+/, '$1');
				const step = +location.pathname.replace(/\/match\/\d+\/(\d+)(?:\/|$).*/, '$1');
				store.dispatch(setCurrentStep(match, step));
			}
		});

		return (
			<Provider store={ store }>
				<I18nextProvider i18n={ i18n }>
					<Router history={ (process.env.NODE_ENV !== 'production' ? hashHistory : browserHistory) } routes={ routes } />
				</I18nextProvider>
			</Provider>
		);
	}
}

export default Root;