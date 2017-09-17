import React from 'react'
import { pure } from 'recompose'
import BEMHelper from 'react-bem-helper'
import Spinner from './Spinner'
import './loading.sass'

const classes = new BEMHelper({
	name: 'Loading'
})

export const renderLoading = () => (
	<div {...classes()}>
		<div {...classes('loading')}>
			<div {...classes('spinner')}>
				<Spinner lg />
			</div>
		</div>
	</div>
)

const Loading = pure(renderLoading)

export default Loading
