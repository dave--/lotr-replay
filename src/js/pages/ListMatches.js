import React from 'react';
import Head from '../components/Head';
import List from '../components/List';
import { Link } from 'react-router';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
		matches: state.matches,
		lng: state.lngs.filter(item => item.active)[0]
	};
}

@connect(mapStateToProps)
class ListPage extends React.Component {
	renderItem(item, idx) {
		const { lng } = this.props;

		return <Link to={ '/match/' + idx + '/' + 0 }>{ item.title[lng.locale] }</Link>;
	}

	render() {
		const { matches } = this.props;

		return (
			<div>
				<Head />
				<List className='MatchList' items={ matches } renderItem={ this.renderItem.bind(this) } />
			</div>
		);
	}
}

export default ListPage