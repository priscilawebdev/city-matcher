import rest from '../common/rest'

const initialState = {
	allCountries: [],
	countryList: {
		items: []
	},
	requestedCountries: [],
	countriesPerPage: 5,
	lastSelection: {},
	isFetching: false
}


export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case actions.LOAD_ALL_COUNTRIES:
			return {
				...state,
				isFetching: true
			}
		case actions.LOAD_ALL_COUNTRIES_FULFILLED:
			return {
				...state,
				allCountries: payload.allCountries,
				isFetching: false
			}
		case actions.LOAD_COUNTRIES_LIST_FULFILLED:
			return {
				...state,
				countryList: payload.countryList
			}
		default:
			return state
	}
}

export function getAllCountries() {
	return (dispatch) => {
		dispatch(actions.loadAllCountries())
		rest.doGet('/api/all.json')
			.then((allCountries) => {
				dispatch(actions.recieveAllCountriesSuccessful(allCountries.data))
			}, (reason) => {
				console.log(reason)
			})
	}
}

export function getCountryList(query) {
	return (dispatch) => {
		dispatch(actions.loadCountriesList())
		rest.doGet(`/api/${query}.json`)
			.then((countryList) => {
				dispatch(actions.recieveCountryListSuccessful(countryList.data))
			}, (reason) => {
				console.log(reason)
			})
	}
}

export const actions = {
	LOAD_ALL_COUNTRIES: 'city-matcher/home/LOAD_ALL_COUNTRIES',
	LOAD_ALL_COUNTRIES_FULFILLED: 'city-matcher/home/LOAD_ALL_COUNTRIES_FULFILLED',
	LOAD_ALL_COUNTRIES_FAILED: 'city-matcher/home/LOAD_ALL_COUNTRIES_FAILED',

	LOAD_COUNTRIES_LIST: 'city-matcher/home/LOAD_COUNTRIES_LIST',
	LOAD_COUNTRIES_LIST_FULFILLED: 'city-matcher/home/LOAD_COUNTRIES_LIST_FULFILLED',
	LOAD_COUNTRIES_LIST_FAILED: 'city-matcher/home/LOAD_COUNTRIES_LIST_FAILED',

	recieveAllCountriesSuccessful: (allCountries) => ({
		type: actions.LOAD_ALL_COUNTRIES_FULFILLED,
		payload: { allCountries }
	}),
	recieveCountryListSuccessful: (countryList) => ({
		type: actions.LOAD_COUNTRIES_LIST_FULFILLED,
		payload: { countryList }
	}),
	loadAllCountries: () => ({
		type: actions.LOAD_ALL_COUNTRIES
	}),
	loadCountriesList: () => ({
		type: actions.LOAD_COUNTRIES_LIST
	})
}
