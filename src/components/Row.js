import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import BEMHelper from 'react-bem-helper'
import Autocomplete from 'nukleus/dist/components/Autocomplete'
import './row.sass'

const classes = new BEMHelper({
	name: 'Row'
})

class Row extends Component {
	constructor(props) {
		super(props)
		this.getValue = ::this.getValue
	}

	getValue(item) {
		let value = null
		if (item.selected) {
			value = item.selected.item || null
		}
		return value
	}
	render() {
		const { intl: { formatMessage }, item, index, countryList, onGetSuggestions, onSelectSuggestion } = this.props
		return (
			<div {...classes()}>
				<div {...classes('city')}>
					<span {...classes('name')}>{item.name} </span>
					<span {...classes('region')}>({item.admin_area})</span>
				</div>
				<div {...classes('autocomplete')}>
					<Autocomplete
						data={countryList}
						id={`autocomplete_${item.id}`}
						label={formatMessage({ id: 'autocomplete.row.label' })}
						name='autocomplete'
						value={this.getValue(item)}
						placeholder={formatMessage({ id: 'autocomplete.row.placeholder' })}
						scrollOffset={70}
						scrollTo
						autoFocus={false}
						onGetSuggestions={onGetSuggestions}
						onSelectSuggestion={(e) => {
							onSelectSuggestion(item, e, index)
						}}
						labelHidden
					/>
				</div>
			</div>
		)
	}
}

Row.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	countryList: PropTypes.array.isRequired,
	onSelectSuggestion: PropTypes.func.isRequired,
	onGetSuggestions: PropTypes.func
}

export default injectIntl(Row)
