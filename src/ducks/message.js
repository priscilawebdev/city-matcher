import hash from 'object-hash'

const initialState = {
	show: false,
	type: null,
	content: {}
}

export default function reducer(state = initialState, { payload, type }) {
	switch (type) {
		case actions.DESTROY_NOTIFICATION:
			return initialState
		case actions.CREATE_NOTIFICATION:
			return {
				...state,
				show: true,
				type: payload.type,
				content: payload.content
			}
		default:
			return state
	}
}

export function emitNotification(type, content) {
	return (dispatch) => {
		const finalId = hash({ ...content })
		dispatch(actions.createNotification(finalId, type, content))
	}
}

export function dismissNotification() {
	return (dispatch) => {
		dispatch(actions.destroyNotification())
	}
}

export const actions = {
	EMIT_NOTIFICATION: 'city-matcher/home/EMIT_NOTIFICATION',
	CREATE_NOTIFICATION: 'city-matcher/home/CREATE_NOTIFICATION',
	DESTROY_NOTIFICATION: 'city-matcher/home/DESTROY_NOTIFICATION',

	emitNotification: (id, type, content) => ({
		type: actions.EMIT_NOTIFICATION,
		payload: { id, type, content }
	}),
	createNotification: (id, type, content) => ({
		type: actions.CREATE_NOTIFICATION,
		payload: { id, type, content }
	}),
	destroyNotification: () => ({
		type: actions.DESTROY_NOTIFICATION
	})
}
