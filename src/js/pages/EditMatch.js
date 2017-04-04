import React from 'react';
import Head from '../components/Head';
import List from '../components/List';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import EditStep from '../components/EditStep';
import { appendStep } from '../actions';
import { Link } from 'react-router';
import { flatten } from '../lib/matchesLoader';

function mapStateToProps(state, props) {
	return {
		matches: state.matches,
		steps: state.matches[props.params.id] ? state.matches[props.params.id].steps : [],
		cards: state.matches[props.params.id] ? flatten(state.matches[props.params.id].locationHistory[0]) : []
	};
}

@translate()
@connect(mapStateToProps)
class EditPage extends React.Component {
	renderStep(matchId, cards, step, idx) {
		return <EditStep step={ step } idx={ idx } matchId={ matchId } cards={ cards } />;
	}
	appendStep(matchId) {
		this.props.dispatch(appendStep(matchId));
	}
	downloadMatches(matches, e) {
		e.preventDefault();
		console.log(matches);
		let matchesCpy = [];
		for (var i = 0; i < matches.length; i++) {
			matchesCpy.push({
				title: matches[i].title,
				locationHistory: matches[i].locationHistory.slice(0, 1),
				steps: matches[i].steps
			});
		}
		let link = document.createElement('a');
		link.download = 'matches.json';
		link.href = 'data:application/json;base64,' + btoa(encodeURIComponent(JSON.stringify(matchesCpy)).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	render() {
		const { matches, steps, params, t, cards } = this.props;

		return (
			<div>
				<Head />
				<Link to={ params.id } onClick={ this.downloadMatches.bind(this, matches) }>{ t('editing:downloadMatches') }</Link>
				<List className='StepList' items={ steps } renderItem={ this.renderStep.bind(this, +params.id, cards) } />
				<button onClick={ this.appendStep.bind(this, +params.id) }>{ t('editing:appendStep') }</button>
			</div>
		);
	}
}

export default EditPage