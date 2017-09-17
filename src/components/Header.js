import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import './header.sass'

const classes = new BEMHelper({
	name: 'Header'
})

class Header extends Component {
	render() {
		const { intl: { formatMessage } } = this.props
		return (
			<header {...classes()}>
				<div {...classes('container')}>
					<Link to='/' {...classes('title')}>{formatMessage({ id: 'header.title' })}</Link>
				</div>
			</header>
		)
	}
}

Header.propTypes = {
	intl: PropTypes.object
}

export default injectIntl(Header)
