import React from 'react';

class List extends React.Component {
	render() {
		const { className, items, renderItem } = this.props;
		const children = items.map((item, idx) => <li key={ idx }>{ renderItem(item, idx) }</li>);

		return (
			<ul className={ className }>
				{ children }
			</ul>
		);
	}
}

export default List;