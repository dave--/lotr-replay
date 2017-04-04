import React from 'react';

const areas = [
	"player1",
	"player1.area",
	"player1.deck",
	"player1.discard",
	"player1.engaged",
	"player1.hand",

	"player2",
	"player2.area",
	"player2.deck",
	"player2.discard",
	"player2.engaged",
	"player2.hand",

	"player3",
	"player3.area",
	"player3.deck",
	"player3.discard",
	"player3.engaged",
	"player3.hand",

	"staging.area",
	"staging.deck",
	"staging.discard",
	"staging.activeLocation",
	"staging.victoryDisplay",
	"staging.quest.area",
	"staging.quest.deck",
	"staging.quest.discard",
].map(area => <option key={ area } value={ area }>{ area }</option>);

class LocationSelect extends React.Component {
	render() {
		const { value, onChange } = this.props;

		return (
			<select value={ value } onChange={ onChange }>
				{ areas }
			</select>
		);
	}
}

export default LocationSelect
