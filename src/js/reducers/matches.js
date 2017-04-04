import steps from './steps';
import { executeStep } from '../lib/matchesLoader';

const match = (state = { steps: [], currentStep: 0, locationHistory: [] }, action) => {
	switch (action.type) {
		case 'APPEND_STEP':
		case 'REMOVE_STEP':
		case 'INSERT_STEP':
		case 'APPEND_ACTION':
		case 'REMOVE_ACTION':
		case 'CHANGE_ACTION':
			return Object.assign({}, state, {
				steps: steps(state.steps, action)
			});
		case 'SET_CURRENT_STEP':
			const retVal = Object.assign({}, state, { currentStep: action.step });
			const newLocationHistory = [];
			if (!state.locations) {
				return retVal;
			}
			if (state.locationHistory.length === 0) {
				state.locationHistory = [state.location];
			}
			let location = state.locationHistory[state.locationHistory.length - 1];
			for (let i = state.locationHistory.length - 1; i < action.step && i < state.steps.length; i++) {
				location = executeStep(location, state.steps[i].actions);
				newLocationHistory.push(location);
			}
			retVal.locationHistory = state.locationHistory.concat(newLocationHistory);
			return retVal;
		default:
			return state;
	}
}

const matches = (state = [], action) => {
	switch (action.type) {
		case 'SET_MATCHES':
			state = action.matches.map((m, idx) => { return match(m, { type: 'SET_CURRENT_STEP', step: state[idx] ? state[idx].currentStep || 0 : 0 }) });
			return state;
		case 'APPEND_STEP':
		case 'REMOVE_STEP':
		case 'INSERT_STEP':
		case 'APPEND_ACTION':
		case 'REMOVE_ACTION':
		case 'CHANGE_ACTION':
			return state.map((m, idx) => { return idx === action.match ? match(m, action) : m });
		case 'SET_CURRENT_STEP':
			if (!state[action.match]) {
				state[action.match] = match(undefined, action);
				return state;
			}
			return state.map((m, idx) => { return idx === action.match ? match(m, action) : m });
		default:
			return state;
	}
}

export default matches