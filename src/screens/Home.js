import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { find } from 'lodash'
import Snackbar from 'material-ui/Snackbar'
import Row from '../components/Row'
import Loading from '../components/Loading'

class Home extends Component {
	constructor(props) {
		super(props)
		this.renderCityRow = ::this.renderCityRow
		this.mapAllCountries = ::this.mapAllCountries
		this.onGetSuggestions = ::this.onGetSuggestions
		this.onCloseSnack = ::this.onCloseSnack
		this.onSelectSuggestion = ::this.onSelectSuggestion
	}

	componentDidMount() {
		const { getAllCountries } = this.props
		getAllCountries()
	}

	onGetSuggestions(e) {
		const { getCountryList } = this.props
		return (e === 'a' || e === 'ab' || e === 'ac') ? getCountryList(e.toLowerCase()) : null
	}

	onSelectSuggestion(country, id) {
		const { emitNotification, allCountries } = this.props
		const result = find(allCountries, (item) => item.id === id)
		const lastSelection = {
			city: country.name,
			selected: country
		}
		result === country && (
			emitNotification('info', lastSelection)
		)
	}

	onCloseSnack() {
		const { dismissNotification } = this.props
		dismissNotification()
	}

	mapAllCountries(data) {
		return (data.map(this.renderCityRow))
	}

	renderCityRow(data, index) {
		const { countryList } = this.props
		return (
			<div className='list-group-item' key={index}>
				<Row
					item={data}
					countryList={countryList}
					onGetSuggestions={this.onGetSuggestions}
					onSelectSuggestion={this.onSelectSuggestion}
				/>
			</div>
		)
	}

	render() {
		const { intl: { formatMessage }, allCountries, isFetching, show, content } = this.props
		return (
			<div className='main'>
				<div className='container-fluid'>
					<div className='list-group'>
						{
							!isFetching ? (
								allCountries && allCountries.length && allCountries !== null ? this.mapAllCountries(allCountries) : null
							) :
								(<Loading />)
						}
					</div>
					<Snackbar
						open={show}
						onRequestClose={() => this.onCloseSnack()}
						autoHideDuration={4000}
						message={formatMessage({ id: 'snackBar.lastSection' }) + JSON.stringify(content, null, '\t')}
						bodyStyle={{
							minHeight: '48px',
							height: 'auto'
						}}
					/>
				</div>
			</div>
		)
	}
}

export default injectIntl(Home)
