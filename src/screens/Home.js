import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Snackbar from 'material-ui/Snackbar'
import Waypoint from 'react-waypoint'
import Row from '../components/Row'
import Loading from '../components/Loading'

class Home extends Component {
	constructor(props) {
		super(props)
		this.onGetSuggestions = ::this.onGetSuggestions
		this.onCloseSnack = ::this.onCloseSnack
		this.onSelectSuggestion = ::this.onSelectSuggestion
		this.loadMore = ::this.loadMore
		this.renderCountryRow = ::this.renderCountryRow
		this.state = {
			page: 1,
			limitPerPage: 10,
			currentCountries: [],
			isLoading: false
		}
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

	loadMore(splittedCountries) {
		const currentCountries = this.state.currentCountries
		this.setState({ isLoading: true })
		splittedCountries.map((country) => (
			currentCountries.push(country)
		))
		this.setState({
			page: this.state.page += 1,
			currentCountries,
			isLoading: false
		})
	}

	renderCountryRow() {
		return this.state.currentCountries.map((country) => (
			<Row
				key={country.id}
				item={country}
				onGetSuggestions={this.onGetSuggestions}
				onSelectSuggestion={this.onSelectSuggestion}
			/>
		))
	}

	render() {
		const { intl: { formatMessage }, isFetching, show, content, allCountries } = this.props
		const indexOfLastCountries = this.state.page * this.state.limitPerPage
		const indexOfFirstCountries = indexOfLastCountries - this.state.limitPerPage
		const splittedCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries)
		return (
			<div className='main'>
				<div className='container-fluid'>
					<div className='list-group'>
						{
							isFetching ? (
								<Loading />
							) : (
								<div className='list-group-item'>
									{ this.renderCountryRow() }
								</div>
							)
						}
					</div>
					<Waypoint
						onEnter={() => this.loadMore(splittedCountries)}
					/>
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
