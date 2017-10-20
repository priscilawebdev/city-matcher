import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import BEMHelper from 'react-bem-helper'
import AutoComplete from 'material-ui/AutoComplete'
import './row.sass'

const classes = new BEMHelper({
	name: 'Row'
})

class Row extends Component { // eslint-disable-line react/prefer-stateless-function
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
								dataSource={countryList}
								onNewRequest={(e) => onSelectSuggestion(item, e.id)}
								onUpdateInput={(e) => onGetSuggestions(e)}
								dataSourceConfig={{ text: 'country', value: 'id' }}
								filter={AutoComplete.noFilter}
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
	onGetSuggestions: PropTypes.func.isRequired,
	intl: PropTypes.object
}

const mapStateToProps = (state) => ({
	...state.home
})

export default connect(mapStateToProps)(injectIntl(Row))
