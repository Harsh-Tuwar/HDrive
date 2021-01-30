import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../rootReducers";

const middlewares = [];
// let useDevTools = false;

middlewares.push(thunkMiddleware);

/**
 * Setting custom logger
 * @see https://www.npmjs.com/package/redux-logger
 * @type {Function|*}
 */

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
	const loggerMiddleware = createLogger({
		// ...options
	});

	middlewares.push(loggerMiddleware);

	// useDevTools = true;
}

/**
 * Configure app redux store
 * @param preloadState
 * @returns {Store<unknown, AnyAction> & Store<S & {}, A> & {dispatch: Dispatch<A>}}
 */
const config = (preloadState) => {
	return createStore(
		rootReducer,
		preloadState,
		compose(
			applyMiddleware(...middlewares),
			// (useDevTools) ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null
		)
	);
};

export default config;