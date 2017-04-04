export const setLng = (locale) => {
	return {
		type: 'SET_LANGUAGE',
		locale
	}
}

export const appendStep = (match) => {
	return {
		type: 'APPEND_STEP',
		match
	}
}
export const removeStep = (match, step) => {
	return {
		type: 'REMOVE_STEP',
		match,
		step
	}
}
export const insertStep = (match, step) => {
	return {
		type: 'INSERT_STEP',
		match,
		step
	}
}
export const appendAction = (match, step) => {
	return {
		type: 'APPEND_ACTION',
		match,
		step
	}
}
export const removeAction = (match, step, action) => {
	return {
		type: 'REMOVE_ACTION',
		match,
		step,
		action
	}
}
export const changeAction = (match, step, action, data) => {
	return {
		type: 'CHANGE_ACTION',
		match,
		step,
		action,
		data
	}
}
export const setCurrentStep = (match, step) => {
	return {
		type: 'SET_CURRENT_STEP',
		match,
		step
	}
}