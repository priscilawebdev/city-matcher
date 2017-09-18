import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import BEMHelper from 'react-bem-helper'
import AutoComplete from 'material-ui/AutoComplete'
import './row.sass'

const classes = new BEMHelper({
	name: 'Row'
})

class Row extends Component {
	constructor(props) {
		super(props)
		this.getValue = ::this.getValue
		this.mapCountries = ::this.mapCountries
	}

	getValue(item) {
		let value = null
		if (item.selected) {
			value = item.selected.item || null
		}
		return value
	}

	mapCountries(countries) {
		const newCountries = []
		countries.map((item) => newCountries.push(item.country))
		return newCountries
	}

	render() {
		const { intl: { formatMessage }, item, countryList, onGetSuggestions, onSelectSuggestion } = this.props
		return (
			<div {...classes()}>
				<div {...classes('row')}>
					<div {...classes('col')}>
						<div {...classes('city')}>
							<span {...classes('name')}>{item.name} </span>
							<span {...classes('region')}>({item.admin_area})</span>
						</div>
					</div>
					<div {...classes('col')}>
						<div {...classes('autocomplete')}>
							<AutoComplete
								id={`autocompletes-${item.id}`}
								floatingLabelText={formatMessage({ id: 'autocomplete.row.label' })}
								name='autocomplete'
								hintText={formatMessage({ id: 'autocomplete.row.placeholder' })}
								maxSearchResults={5}
								dataSource={this.mapCountries(countryList)}
								onUpdateInput={(e) => onGetSuggestions(e)}
								onNewRequest={(e) => onSelectSuggestion(item, e)}
								dataSourceConfig={{ value: this.getValue(item) }}
								filter={(searchText) => searchText === 'a' || searchText === 'ab' || searchText === 'ac'}
								fullWidth
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Row.propTypes = {
	item: PropTypes.object.isRequired,
	countryList: PropTypes.array.isRequired,
	onSelectSuggestion: PropTypes.func.isRequired,
	onGetSuggestions: PropTypes.func.isRequired
}

export default injectIntl(Row)
