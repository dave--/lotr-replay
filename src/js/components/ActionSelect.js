import React from 'react';
import { translate } from 'react-i18next';

@translate()
class ActionSelect extends React.Component {
	render() {
		const { value, onChange, t } = this.props;

		return (
			<select value={ value } onChange={ onChange }>
				<option value='setPhase'>{ t('editing:setPhase') }</option>
				<option value='setRound'>{ t('editing:setRound') }</option>
				<option value='setThreat'>{ t('editing:setThreat') }</option>
				<option value='setResource'>{ t('editing:setResource') }</option>
				<option value='setDamage'>{ t('editing:setDamage') }</option>
				<option value='setProgress'>{ t('editing:setProgress') }</option>
				<option value='moveCard'>{ t('editing:moveCard') }</option>
				<option value='flipCardToBack'>{ t('editing:flipCardToBack') }</option>
				<option value='flipCardToFront'>{ t('editing:flipCardToFront') }</option>
				<option value='tapCard'>{ t('editing:tapCard') }</option>
				<option value='untapCard'>{ t('editing:untapCard') }</option>
				<option value='attachTo'>{ t('editing:attachTo') }</option>
			</select>
		);
	}
}

export default ActionSelect
