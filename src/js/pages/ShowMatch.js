import React from 'react';
import Head from '../components/Head';
import Location from '../components/Location';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

function mapStateToProps(state, props) {
	const step = props.params.step;
	const match = props.params.id;
	const targets = [];

	// match or step doesn't exist, return empty
	if (match >= state.matches.length || step > state.matches[match].steps.length) {
		return {};
	}
	// return location and steps (for navigation)
	return {
		location: state.matches[match].locationHistory[step],
		isFirstStep: step < 1,
		isLastStep: step > state.matches[match].steps.length - 1
	};
}

@translate()
@connect(mapStateToProps)
class ShowMatch extends React.Component {
	render() {
		const { t, location, params, isFirstStep, isLastStep } = this.props;
		
		if (!location || !location.id) {
			return (<div>{ t('notFound') }</div>);
		}

		const stepControls = {};
		if (!isFirstStep) {
			stepControls.prev = '/match/' + params.id + '/' + (+params.step - 1);
		}
		if (!isLastStep) {
			stepControls.next = '/match/' + params.id + '/' + (+params.step + 1);
		}


		return (
			<div class='showMatch'>
				<Head stepControls={ stepControls }/>
				<Location t={ t } location={ location } linkPrefix={ '/match/' + params.id + '/' + params.step + '/' } />
			</div>
		);
	}
}

export default ShowMatch