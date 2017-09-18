import React from 'react'
import { PropTypes as T } from 'prop-types'
import BEMHelper from 'react-bem-helper'
import './spinner.sass'

const classes = new BEMHelper({
	name: 'Spinner'
})

export const Spinner = ({ lg, centered } = {}) => (
	<div {...classes('', { lg, centered })} />
)


Spinner.propTypes = {
	lg: T.bool,
	centered: T.bool
}

export default Spinner
