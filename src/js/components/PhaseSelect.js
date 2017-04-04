import React from 'react';
import { translate } from 'react-i18next';

@translate()
class PhaseSelect extends React.Component {
	render() {
		const { value, onChange, t } = this.props;

		return (
			<select value={ value } onChange={ onChange }>
				<option value='phase-setup'>{ t('gameTerms:phase-setup') }</option>
				<option value='phase-resource'>{ t('gameTerms:phase-resource') }</option>
				<option value='phase-planning'>{ t('gameTerms:phase-planning') }</option>
				<option value='phase-quest'>{ t('gameTerms:phase-quest') }</option>
				<option value='phase-travel'>{ t('gameTerms:phase-travel') }</option>
				<option value='phase-encounter'>{ t('gameTerms:phase-encounter') }</option>
				<option value='phase-combat'>{ t('gameTerms:phase-combat') }</option>
				<option value='phase-refresh'>{ t('gameTerms:phase-refresh') }</option>
			</select>
		);
	}
}

export default PhaseSelect
