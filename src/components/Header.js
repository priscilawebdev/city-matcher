import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { injectIntl } from 'react-intl'
import Link from 'react-router-dom/Link'
import './header.sass'

const classes = new BEMHelper({
	name: 'Header'
})

const Header = ({ intl: { formatMessage } }) => (
	<header {...classes()}>
		<div {...classes('container')}>
			<Link to='/' {...classes('title')}>{formatMessage({ id: 'header.title' })}</Link>
		</div>
	</header>
)

Header.propTypes = {
	intl: PropTypes.object
}

export default injectIntl(Header)
