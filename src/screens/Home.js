import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import Snackbar from 'material-ui/Snackbar'
import Waypoint from 'react-waypoint'
import Row from '../components/Row'
import Spinner from '../components/Spinner'

const currentCountries = []
const currentRows = []

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
		const result = allCountries.find((item) => item.id === id)
		const lastSelection = {
			city: country.name,
			selected: country
		}
		if (isEqual(result, country)) {
			emitNotification('info', lastSelection)
		}
	}

	onCloseSnack() {
		const { dismissNotification } = this.props
		dismissNotification()
	}

	loadMore() {
		if (this.props.allCountries.length > 0) {
			this.setState({ isLoading: true })
			setTimeout(() => {
				this.setState({
					page: this.state.page += 1,
					isLoading: false
				})
			}, 2 * 1000)
		}
	}

	renderCountryRow(splittedCountries) {
		splittedCountries.map((country) => { // eslint-disable-line array-callback-return
			if (!currentCountries.find((item) => item.id === country.id)) {
				currentCountries.push(country)
				currentRows.push(
					<div
						className='list-group-item'
						key={country.id}
					>
						<Row
							item={country}
							onGetSuggestions={this.onGetSuggestions}
							onSelectSuggestion={this.onSelectSuggestion}
						/>
					</div>
				)
			}
		})

		return currentRows
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
						{!isFetching ? (
							this.renderCountryRow(splittedCountries)
						) : (
							<Spinner centered />
						)}
					</div>
					<Waypoint
						onEnter={() => this.loadMore()}
					/>
					{(!isFetching && this.state.isLoading) && (
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

Home.propTypes = {
	getAllCountries: PropTypes.func.isRequired,
	getCountryList: PropTypes.func.isRequired,
	emitNotification: PropTypes.func.isRequired,
	dismissNotification: PropTypes.func.isRequired,
	allCountries: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	show: PropTypes.bool.isRequired,
	content: PropTypes.object.isRequired,
	intl: intlShape
}

export default injectIntl(Home)
