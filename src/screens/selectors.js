import { createSelector } from 'reselect'

//= ====================================
//  MEMOIZED SELECTORS
//-------------------------------------

const SelectMessage = createSelector((state) =>
	state.message,
(message) => message.toJS()
)

const SelectHome = createSelector((state) =>
	state.home,
(home) => home.toJS()
)

export {
	SelectMessage,
	SelectHome
}
