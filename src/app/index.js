import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'
import HomeContainer from '../screens/HomeContainer'

const App = () => (
	<div>
		<Header />
		<Route exact path='/' component={HomeContainer} />
	</div>
)

export default App
