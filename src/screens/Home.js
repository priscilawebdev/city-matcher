import React, { Component } from 'react'
import BEMHelper from 'react-bem-helper'
import Notification from 'nukleus/dist/components/Notification'
import Row from '../components/Row'
import Loading from '../components/Loading'

const classes = new BEMHelper({
	name: 'Home'
})

class Home extends Component {
	constructor(props) {
		super(props)
		this.renderCityRow = ::this.renderCityRow
		this.mapCountries = ::this.mapCountries
		this.onGetSuggestions = ::this.onGetSuggestions
		this.onSelectSuggestion = ::this.onSelectSuggestion
	}

	componentDidMount() {
		const { getAllCountries } = this.props
		getAllCountries()
	}

	onGetSuggestions(e) {
		const { getCountryList } = this.props
		getCountryList(e.toLowerCase())
	}

	onSelectSuggestion(country, countryList, index) {
		const { allCountries, emitNotification } = this.props
		allCountries[index].selected = countryList

		const lastSelection = {}
		lastSelection.city = country.name
		lastSelection.selected = countryList
		emitNotification('info', lastSelection)
	}

	mapCountries(cities) {
		return (cities.map(this.renderCityRow))
	}

	renderCityRow(data, index) {
		const { countryList } = this.props
		return (
			<div className='list-group-item' key={index}>
				<Row
					item={data}
					countryList={countryList}
					index={10}
					onGetSuggestions={this.onGetSuggestions}
					onSelectSuggestion={this.onSelectSuggestion}
				/>
			</div>
		)
	}

	render() {
		const { allCountries, isFetching, show, content } = this.props
		return (
			<div {...classes()}>
				<div className='list-group'>
					{
						isFetching ? (
							<Loading />
						) : (
							allCountries && allCountries.length && allCountries !== null ? this.mapCountries(allCountries) : null
						)
					}
				</div>
				<Notification
					message={content}
					visible={show}
				/>
			</div>
		)
	}
}

export default Home
