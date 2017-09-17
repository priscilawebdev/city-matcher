import React from 'react'
import { PropTypes as T } from 'prop-types'
import { pure } from 'recompose'
import BEMHelper from 'react-bem-helper'
import './spinner.sass'

const classes = new BEMHelper({
	name: 'Spinner'
})

export const renderSpinner = ({ lg, centered } = {}) => (
	<div {...classes('', { lg, centered })} />
)

const Spinner = pure(renderSpinner)

Spinner.propTypes = {
	lg: T.bool,
	centered: T.bool
}

export default Spinner
