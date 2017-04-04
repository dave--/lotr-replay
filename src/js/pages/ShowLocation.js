import React from 'react';
import Head from '../components/Head';
import List from '../components/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getLocationById, flatten } from '../lib/matchesLoader';

function mapStateToProps(state, props) {
	const cards = [];
	if (!state.matches[props.params.id]) {
		return { cards: [] };
	}
	let location = state.matches[props.params.id].locationHistory[props.params.step];
	location = getLocationById(location, props.params.card);

	return {
		cards: flatten(location)
	};
}

@translate()
@connect(mapStateToProps)
class ShowLocation extends React.Component {
	renderItem(item) {
		const { t } = this.props;
		return <img data-type={ t(item.textKey + '.type', { lng: 'en' }) } src={ 'http://deckbauer.telfador.net/' + t(item.textKey + (item.flipped ? '.back' : '.front')) } />;
	}
	render() {
		const { t, cards } = this.props;

		return (
			<div class='ShowLocation'>
				<Head/>
				<List className='locationDetails' items={ cards } renderItem={ this.renderItem.bind(this) } />
			</div>
		);
	}
}

export default ShowLocation