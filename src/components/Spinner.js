import React from 'react'
import { PropTypes as T } from 'prop-types'
import BEMHelper from 'react-bem-helper'
import './spinner.sass'

const classes = new BEMHelper({
	name: 'Spinner'
})

export const Spinner = ({ lg, centered, inline, emptyState } = {}) => (
	<div {...classes('', { lg, centered, inline, emptyState })} />
)


Spinner.propTypes = {
	lg: T.bool,
	centered: T.bool,
	inline: T.bool,
	emptyState: T.bool
}

export default Spinner
