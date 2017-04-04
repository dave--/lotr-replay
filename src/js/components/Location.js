import React from 'react';
import { translate } from 'react-i18next';
import List from '../components/List';
import { Link } from 'react-router';

@translate()
class Location extends React.Component {
	renderSubLocation(location) {
		const { t, linkPrefix } = this.props;

		return <Location t={ t } location={ location } linkPrefix={ linkPrefix }/>;
	}

	render() {
		const { t, location, linkPrefix } = this.props;

		return (
			<div data-is-flipped={ location.flipped } data-is-tapped={ location.tapped } data-location-id={ location.id } data-is-card={ location.isCard } data-subs-cnt={ (location.subs || []).length } data-type={ location.isCard ? t(location.textKey + '.type', { lng: 'en' }) : 'location' }>
				<span class='label'>{ t(location.textKey + (location.isCard ? '.title' : '')) }</span>
				<Link to={ linkPrefix + location.id }>{ t('zoomIn') }</Link>
				{ (location.threat ? (<span class='threat'>{ t('gameTerms:threat', location) }</span>) : null) }
				{ (location.round ? (<span class='round'>{ t('gameTerms:roundCount', location) }</span>) : null) }
				{ (location.phase ? (<span class='phase'>{ t('gameTerms:phase', { phase: t('gameTerms:' + location.phase) }) }</span>) : null) }
				{ (location.resource ? (<span class='resource'>{ location.resource }</span>) : null) }
				{ (location.damage ? (<span class='damage'>{ location.damage }</span>) : null) }
				{ (location.progress ? (<span class='progress'>{ location.progress }</span>) : null) }
				{ (location.isCard ? (<img src={ 'http://deckbauer.telfador.net/' + t(location.textKey + (location.flipped ? '.back' : '.front')) } />) : null) }
				<List className='subs' items={ location.subs || [] } renderItem={ this.renderSubLocation.bind(this) } />
			</div>
		);
	}
}

export default Location
