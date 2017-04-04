import React from 'react';
import List from '../components/List';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { removeStep, insertStep, appendAction } from '../actions';
import EditAction from '../components/EditAction';

@translate()
@connect()
class EditStep extends React.Component {
	removeStep(match, step, e) {
		this.props.dispatch(removeStep(match, step));
	}
	insertStep(match, step, e) {
		this.props.dispatch(insertStep(match, step));
	}
	appendAction(match, step, e) {
		this.props.dispatch(appendAction(match, step));
	}
	renderAction(matchId, stepId, cards, action, idx) {
		return <EditAction action={ action } idx={ idx } stepId={ stepId } matchId={ matchId } cards={ cards } />;
	}
	render() {
		const { idx, matchId, t, step, cards } = this.props;

		return (
			<div>
				<h3>{ t('editing:step', {number: idx + 1}) } <button onClick={ this.removeStep.bind(this, matchId, idx) }>{ t('editing:remove') }</button><button onClick={ this.insertStep.bind(this, matchId, idx) }>{ t('editing:insertStep') }</button></h3>
				<List className='ActionList' items={ step.actions } renderItem={ this.renderAction.bind(this, matchId, idx, cards) } />
				<button onClick={ this.appendAction.bind(this, matchId, idx) }>{ t('editing:appendAction') }</button>
			</div>
		);
	}
}

export default EditStep
