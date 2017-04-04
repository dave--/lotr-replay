import React from 'react';
import { Link } from 'react-router';
import List from './List';
import { setLng } from '../actions';
import { connect } from 'react-redux';

@connect()
class LngPicker extends React.Component {
	onClick(locale, e) {
		e.preventDefault();
		this.props.dispatch(setLng(locale));
	}

	renderItem(item) {
		return <Link to={ item.locale } onClick={ this.onClick.bind(this, item.locale) } className={ item.active ? 'is-active' : null }>{ item.lng }</Link>;
	}

	render() {
		const { lngs } = this.props;

		return (
			<List className='LngPicker' items={ lngs } renderItem={ this.renderItem.bind(this) } />
		);
	}
}

export default LngPicker;