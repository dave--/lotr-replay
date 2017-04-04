const actionFn = (state = { to: '', which: '' }, action) => {
	switch (action.type) {
		case 'CHANGE_ACTION':
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
}

const actions = (state = [], action) => {
	switch (action.type) {
		case 'APPEND_ACTION':
			return state.slice(0).concat([actionFn(undefined, action)]);
		case 'REMOVE_ACTION':
			return state.slice(0, action.action).concat(state.slice(action.action + 1));
		case 'CHANGE_ACTION':
			return state.map((a, idx) => { return idx === action.action ? actionFn(a, action) : a });
		default:
			return state;
	}
}

const step = (state = { actions: [] }, action) => {
	switch (action.type) {
		case 'APPEND_ACTION':
		case 'REMOVE_ACTION':
		case 'CHANGE_ACTION':
			return Object.assign({}, state, {
				actions: actions(state.actions, action)
			});
		case 'INSERT_STEP':
		case 'APPEND_STEP':
			return {
				actions: []
			};
		default:
			return state;
	}
}

const steps = (state = [], action) => {
	switch (action.type) {
		case 'INSERT_STEP':
			return state.slice(0, action.step).concat([step(undefined, action)]).concat(state.slice(action.step));
		case 'REMOVE_STEP':
			return state.slice(0, action.step).concat(state.slice(action.step + 1));
		case 'APPEND_STEP':
			return state.slice(0).concat([step(undefined, action)]);
		case 'APPEND_ACTION':
		case 'REMOVE_ACTION':
		case 'CHANGE_ACTION':
			return state.map((s, idx) => { return idx === action.step ? step(s, action) : s });
		default:
			return state;
	}
}

export default steps