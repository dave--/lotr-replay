import React from 'react';
import PhaseSelect from '../components/PhaseSelect';
import ActionSelect from '../components/ActionSelect';
import CardSelect from '../components/CardSelect';
import LocationSelect from '../components/LocationSelect';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { removeAction, changeAction } from '../actions';

@translate()
@connect()
class EditAction extends React.Component {
	removeAction(match, step, action, e) {
		this.props.dispatch(removeAction(match, step, action));
	}
	change(match, step, action, key, e) {
		let data = {};
		data[key] = e.target.value;
		this.props.dispatch(changeAction(match, step, action, data));
	}
	render() {
		const { action, idx, t, matchId, stepId, cards } = this.props;

		const fields = [];
		fields.push(<ActionSelect key='action.what' value={ action.what } onChange={ this.change.bind(this, matchId, stepId, idx, 'what') } />);
		switch (action.what) {
			case 'setPhase':
				fields.push(<PhaseSelect key='action.to' value={ action.to } onChange={ this.change.bind(this, matchId, stepId, idx, 'to') } />);
				break;
			case 'setThreat':
				fields.push(<LocationSelect key='action.which' value={ action.which } onChange={ this.change.bind(this, matchId, stepId, idx, 'which') } />);
				fields.push(<input key='action.to' type='number' value={ action.to } onChange={ this.change.bind(this, matchId, stepId, idx, 'to') }/>);
				break;
			case 'setRound':
				fields.push(<input key='action.to' type='number' value={ action.to } onChange={ this.change.bind(this, matchId, stepId, idx, 'to') }/>);
				break;
			case 'moveCard':
				fields.push(<CardSelect key='action.which' match={ matchId } value={ action.which } cards={ cards } onChange={ this.change.bind(this, matchId, stepId, idx, 'which') } />);
				fields.push(<LocationSelect key='action.to' value={ action.to } onChange={ this.change.bind(this, matchId, stepId, idx, 'to') } />);
				break;
			case 'setResource':
			case 'setDamage':
			case 'setProgress':
				fields.push(<CardSelect key='action.which' match={ matchId } value={ action.which } cards={ cards } onChange={ this.change.bind(this, matchId, stepId, idx, 'which') } />);
				fields.push(<input key='action.to' type='number' value={ action.to } onChange={ this.change.bind(this, matchId, stepId, idx, 'to') }/>);
				break;
			case 'tapCard':
			case 'untapCard':
			case 'flipCardToFront':
			case 'flipCardToBack':
				fields.push(<CardSelect key='action.which' match={ matchId } value={ action.which } cards={ cards } onChange={ this.change.bind(this, matchId, stepId, idx, 'which') } />);
				break;
			case 'attachTo':
				fields.push(<CardSelect key='action.which' match={ matchId } value={ action.which } cards={ cards } onChange={ this.change.bind(this, matchId, stepId, idx, 'which') } />);
				fields.push(<CardSelect key='action.to' match={ matchId } value={ action.to } cards={ cards } onChange={ this.change.bind(this, matchId, stepId, idx, 'to') } />);
				break;
		}
		fields.push(<button key='action.remove' onClick={ this.removeAction.bind(this, matchId, stepId, idx) }>{ t('editing:removeAction') }</button>)

		return (
			<div>
				{ fields }
			</div>
		);
	}
}

export default EditAction
