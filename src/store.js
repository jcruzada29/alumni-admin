import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

export const history = createBrowserHistory({
	basename: process.env.NODE_ENV === 'local' ? '/' : '/msalum/admin'
});

// Initialize store
let store;

// Return a function so we can configure it
export default () => {
	if (store) {
		return store;
	}

	const initialState = {};
	const enhancers = [];
	const middleware = [thunk, routerMiddleware(history)];

	// if (process.env.NODE_ENV === 'local') {
	// 	const devToolsExtension = window.devToolsExtension;

	// 	if (typeof devToolsExtension === 'function') {
	// 		enhancers.push(devToolsExtension());
	// 	}
	// }

	// enhancers
	const composedEnhancers = compose(
		applyMiddleware(...middleware),
		// devtools redux
		(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'testing2')
			&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose(),
		...enhancers
	);

	// create store
	store = createStore(rootReducer(history), initialState, composedEnhancers);

	return store;
};
