import React from 'react'
import BEMHelper from 'react-bem-helper'
import Spinner from './Spinner'
import './loading.sass'

const classes = new BEMHelper({
	name: 'Loading'
})

export const Loading = () => (
	<div {...classes()}>
		<div {...classes('loading')}>
			<div {...classes('spinner')}>
				<Spinner lg />
			</div>
		</div>
	</div>
)

export default Loading
