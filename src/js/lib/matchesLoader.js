import ajax from './ajax';

// initial load of matches and creation of location tree for each match and step
export const flatten = (location) => {
	if (!location) {
		return [];
	}
	let cards = [];
	if (location.isCard) {
		cards.push(location);
	}
	for (let i = 0; i < (location.subs || []).length; i++) {
		cards = cards.concat(flatten(location.subs[i]));
	}
	return cards;
}
export const getLocationById = (location, id) => {
	if (location) {
		for (let i = 0; i < (location.subs || []).length; i++) {
			if (location.subs[i].id === id) {
				return location.subs[i];
			}
			let sub = getLocationById(location.subs[i], id);
			if (sub) {
				return sub;
			}
		}
	}
	return null;
}
export const getLocationParentById = (location, id) => {
	for (let i = 0; i < (location.subs || []).length; i++) {
		if (location.subs[i].id === id) {
			return location;
		}
		let sub = getLocationParentById(location.subs[i], id);
		if (sub) {
			return sub;
		}
	}
	return null;
}
export const executeStep = (locationTree, actions) => {
	let ret = JSON.parse(JSON.stringify(locationTree));
	let subjectLocation, idx, targetLocation;
	for (let i = 0; i < actions.length; i++) {
		switch (actions[i].what) {
			case 'setPhase':
				ret.phase = actions[i].to;
				break;
			case 'setRound':
				ret.round = actions[i].to;
				break;
			case 'setThreat':
				getLocationById(ret, actions[i].which).threat = actions[i].to;
				break;
			case 'setDamage':
				subjectLocation = getLocationById(ret, actions[i].which);
				subjectLocation.damage = +actions[i].to;
				break;
			case 'setProgress':
				subjectLocation = getLocationById(ret, actions[i].which);
				subjectLocation.progress = +actions[i].to;
				break;
			case 'setResource':
				subjectLocation = getLocationById(ret, actions[i].which);
				subjectLocation.resource = +actions[i].to;
				break;
			case 'tapCard':
				getLocationById(ret, actions[i].which).tapped = true;
				break;
			case 'untapCard':
				getLocationById(ret, actions[i].which).tapped = false;
				break;
			case 'flipCardToFront':
				getLocationById(ret, actions[i].which).flipped = false;
				break;
			case 'flipCardToBack':
				getLocationById(ret, actions[i].which).flipped = true;
				break;
			case 'moveCard':
				subjectLocation = getLocationParentById(ret, actions[i].which);
				targetLocation = getLocationById(ret, actions[i].to);
				if (!targetLocation.subs) {
					targetLocation.subs = [];
				}
				idx = subjectLocation.subs.findIndex(item => item.id === actions[i].which);
				targetLocation.subs.push(subjectLocation.subs.splice(idx, 1)[0]);
				break;
			case 'attachTo':
				targetLocation = getLocationById(ret, actions[i].to);
				if (!targetLocation.subs) {
					targetLocation.subs = [];
				}
				subjectLocation = getLocationParentById(ret, actions[i].which);
				idx = subjectLocation.subs.findIndex(item => item.id === actions[i].which);
				targetLocation.subs.push(subjectLocation.subs.splice(idx, 1)[0]);
				break;

		}
	}
	return ret;
}

export const load = (pathToJSON, cb) => {
	ajax(pathToJSON, (data) => {
		//try {
			let matches = JSON.parse(data);

			/*for (let i = 0; i < matches.length; i++) {
				matches[i].steppedCardTrees = [];

				let locationTree = matches[i].locations;
				matches[i].cards = flatten(matches[i].locations);
				matches[i].steppedCardTrees.push(locationTree);
				for (let j = 0; j < matches[i].steps.length; j++) {
					locationTree = executeStep(JSON.parse(JSON.stringify(locationTree)), matches[i].steps[j].actions);
					matches[i].steppedCardTrees.push(locationTree);
				}
			}*/
			for (let i = 0; i < matches.length; i++) {
				matches[i].locationHistory = [JSON.parse(JSON.stringify(matches[i].locations))];
			}

			return cb(null, matches);
/*		} catch (e) {
			return cb(e);
		}*/
	});
}