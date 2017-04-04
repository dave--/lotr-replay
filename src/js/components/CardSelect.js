import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

@translate()
class PhaseSelect extends React.Component {
	render() {
		const { value, onChange, t, cards } = this.props;

		return (
			<select value={ value } onChange={ onChange }>
				{ cards.map(card => <option key={ card.id } value={ card.id }>{ t(card.textKey + '.title') + ' (' + card.id + ')' }</option>) }
			</select>
		);
	}
}

export default PhaseSelect
