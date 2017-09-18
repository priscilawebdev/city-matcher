import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Snackbar from 'material-ui/Snackbar'
import Pagination from 'material-ui-pagination'
import Row from '../components/Row'
import Loading from '../components/Loading'

class Home extends Component {
	constructor(props) {
		super(props)
		this.renderCityRow = ::this.renderCityRow
		this.mapAllCountries = ::this.mapAllCountries
		this.onGetSuggestions = ::this.onGetSuggestions
		this.onSelectSuggestion = ::this.onSelectSuggestion
		this.onCloseSnack = ::this.onCloseSnack
		this.setTotal = ::this.setTotal
		this.setDisplay = ::this.setDisplay
		this.state = { total: 20, display: 7, number: 7 }
	}

	componentDidMount() {
		const { getAllCountries } = this.props
		getAllCountries()
	}

	onGetSuggestions(e) {
		const { getCountryList } = this.props
		return (e === 'a' || e === 'ab' || e === 'ac') ? getCountryList(e.toLowerCase()) : null
	}

	onSelectSuggestion(country) {
		const { emitNotification } = this.props
		const lastSelection = {
			city: country.name,
			selected: country
		}
		emitNotification('info', lastSelection)
	}

	onCloseSnack() {
		const { dismissNotification } = this.props
		dismissNotification()
	}

	setTotal(event, total) {
		// eslint-disable-next-line no-param-reassign
		total = total.trim()
		if (total.match(/^\d*$/)) {
			if (total !== '') {
				// eslint-disable-next-line no-param-reassign
				total = parseInt(total, 10)
			} else {
				// eslint-disable-next-line no-param-reassign
				total = 0
			}
			this.setState({ total })
		}
	}

	setDisplay(event, display) {
		// eslint-disable-next-line no-param-reassign
		display = display.trim()
		if (display.match(/^\d*$/)) {
			if (display !== '') {
				// eslint-disable-next-line no-param-reassign
				display = parseInt(display, 10)
			} else {
				// eslint-disable-next-line no-param-reassign
				display = 0
			}
			this.setState({ display })
		}
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
		const message = formatMessage({ id: 'snackBar.lastSection' }) + JSON.stringify(content, null, 4)
		return (
			<div className='main'>
				<div className='container-fluid'>
					<div className='list-group'>
						{
							isFetching ? (
								<Loading />
							) : (
								allCountries && allCountries.length && allCountries !== null ? this.mapAllCountries(allCountries) : null
							)
						}
					</div>
					<Pagination
						total={this.state.total}
						current={this.state.number}
						display={this.state.display}
						onChange={(number) => this.setState({ number })}
					/>
					<Snackbar
						open={show}
						onRequestClose={() => this.onCloseSnack()}
						autoHideDuration={4000}
						message={message}
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
