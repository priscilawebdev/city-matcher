import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { isEqual } from 'lodash'
import Snackbar from 'material-ui/Snackbar'
import Waypoint from 'react-waypoint'
import Row from '../components/Row'
import Spinner from '../components/Spinner'
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
		console.log('initial', this.props)
	}

	onGetSuggestions(e) {
		const { getCountryList } = this.props
		return (e === 'a' || e === 'ab' || e === 'ac') ? getCountryList(e.toLowerCase()) : null
	}

	onSelectSuggestion(country, id) {
		const { emitNotification, allCountries } = this.props
		const result = allCountries.find((item) => item.id === id)
		const lastSelection = {
			city: country.name,
			selected: country
		}
		isEqual(result, country) && (
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
		setTimeout(() => {
			splittedCountries.map((country) => (
				currentCountries.push(country)
			))
			this.setState({
				page: this.state.page += 1,
				currentCountries,
				isLoading: false
			})
		}, 2 * 1000)
	}

	renderCountryRow() {
		return this.state.currentCountries.length > 0 && (
			<div className='list-group-item'>
				{
					this.state.currentCountries.map((country) => (
						<Row
							key={country.id}
							item={country}
							onGetSuggestions={this.onGetSuggestions}
							onSelectSuggestion={this.onSelectSuggestion}
						/>
					))
				}
			</div>
		)
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
						{!isFetching ? this.renderCountryRow() : <Loading />}
					</div>
					<Waypoint
						onEnter={() => this.loadMore(splittedCountries)}
					/>
					{(isFetching || this.state.isLoading) && (
						<div className='u-spacing20px'>
							<Spinner />
						</div>
					)}
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
