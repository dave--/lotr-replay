import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import ListMatches from './pages/ListMatches';
import ShowMatch from './pages/ShowMatch';
import EditMatch from './pages/EditMatch';
import ShowLocation from './pages/ShowLocation';

export default (
	<Route path='/'>
		<IndexRoute component={ ListMatches } />
		<Route path='/match/:id/:step' component={ ShowMatch } />
		<Route path='/match/:id/:step/:card' component={ ShowLocation } />
		<Route path='/editMatch/:id' component={ EditMatch } />
	</Route>
)