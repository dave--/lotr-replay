import { combineReducers } from 'redux';
import lngs from './lngs';
import matches from './matches';

const reducers = combineReducers({
	lngs,
	matches
})

export default reducers