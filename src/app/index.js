import React from 'react'
import Route from 'react-router-dom/Route'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import HomeContainer from '../screens/HomeContainer'

const App = () => (
	<MuiThemeProvider>
		<div>
			<Header />
			<Route exact path='/' component={HomeContainer} />
		</div>
	</MuiThemeProvider>
)

export default App
