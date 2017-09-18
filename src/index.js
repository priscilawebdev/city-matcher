// 3rd party libs
import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import domready from 'domready'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'sanitize.css/sanitize.css'

// custom libs
import configureStore from './common/store'
import history from './common/history'

// general views
import App from './app'

// general styles
import './common/styles/index.sass'

// localization
import enMessages from './common/i18n/en'
const EN = 'en'

const store = configureStore()
const rootElement = document.getElementById('root')

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

addLocaleData([...en])

// this if is a Safari hack. Because safari doesn't support by default Intl.
// more about this topic: https://github.com/andyearnshaw/Intl.js/
/* eslint-disable global-require */
if (!window.intl) {
	window.intl = require('intl')
	window.intl.polyFill = true
	require('intl/locale-data/jsonp/en.js')
	require('intl/locale-data/jsonp/de.js')
}
/* eslint-enable */

const FullApp = () => (
	<IntlProvider locale={EN} defaultLocale={EN} messages={enMessages}>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<App />
				</div>
			</ConnectedRouter>
		</Provider>
	</IntlProvider>
)

domready(() => {
	render(
		<FullApp />,
		rootElement
	)
})
