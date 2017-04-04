const match = (state = {}, action) => {
	switch (action.type) {
		case 'REMOVE_ACTION':
		case 'APPEND_ACTION':
		case 'CHANGE_ACTION':
		case 'INSERT_STEP':
		case 'REMOVE_STEP':
		case 'APPEND_STEP':
			return Object.assign({}, state, { steps: steps(state.steps, action) });
		default:
			return state;
	}
}

const matches = (state = [], action) => {
	switch (action.type) {
		case 'SET_MATCHES':
			return action.matches;
		case 'REMOVE_ACTION':
		case 'APPEND_ACTION':
		case 'CHANGE_ACTION':
		case 'INSERT_STEP':
		case 'REMOVE_STEP':
		case 'APPEND_STEP':
			let newState = state.slice(0);
			newState[action.match] = match(newState[action.match], action);
			return newState;
		default:
			return state;
	}
}

export default matches

const actionFn = (state = { to: '', which: '' }, action) => {
	switch (action.type) {
		case 'CHANGE_ACTION':
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
}

const step = (state = [], action) => {
	let newState = state.slice(0);
	switch (action.type) {
		case 'REMOVE_ACTION':
			newState.splice(action.action, 1);
			return newState;
		case 'APPEND_ACTION':
			newState.push(actionFn(undefined, action));
			return newState;
		case 'CHANGE_ACTION':
			newState[action.action] = actionFn(newState[action.action], action);
			return newState
		default:
			return state;
	}
}

const steps = (state = [], action) => {
	let newState = state.slice(0);

	switch (action.type) {
		case 'REMOVE_STEP':
			newState.splice(action.step, 1);
			return newState;
		case 'APPEND_STEP':
			newState.push(step(undefined, action));
			return newState;
		case 'INSERT_STEP':
			newState.splice(action.step, 0, step(undefined, action));
			return newState;
		case 'REMOVE_ACTION':
		case 'APPEND_ACTION':
		case 'CHANGE_ACTION':
			newState[action.step] = step(newState[action.step], action);
			return newState;
		default:
			return state;
	}
}
