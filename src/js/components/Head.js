import { connect } from 'react-redux'
import React from 'react';
import { translate } from 'react-i18next';
import LngPicker from './LngPicker';
import { Link } from 'react-router';

const mapStateToProps = (state) => {
	return {
		lngs: state.lngs
	};
}

@connect(mapStateToProps)
@translate()
class Head extends React.Component {
	render() {
		const { t, lngs, stepControls } = this.props;

		return (
			<header>
				<Link to="/"><h1>{ t('title') }</h1></Link>
				<div class='stepControls'>
					{ (stepControls && stepControls.prev) ? (<Link className='prev' to={ stepControls.prev }>{ t('prevStep') }</Link>) : null}
					{ (stepControls && stepControls.next) ? (<Link className='next' to={ stepControls.next }>{ t('nextStep') }</Link>) : null}
				</div>
				<LngPicker lngs={ lngs }/>
			</header>
		);
	}
}

export default Head;