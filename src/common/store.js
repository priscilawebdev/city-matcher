import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import history from './history'
import home from '../ducks/home'
import message from '../ducks/message'

const reducers = {
	home,
	message
}

export default function configureStore() {
	let middleware = applyMiddleware(thunk, routerMiddleware(history))

	if (process.env.NODE_ENV !== 'production') {
		const devToolsExtension = window.devToolsExtension
		if (typeof devToolsExtension === 'function') {
			middleware = compose(middleware, devToolsExtension())
		}
	}

	const store = createStore(combineReducers(reducers), middleware)

	return store
}
