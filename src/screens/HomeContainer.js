import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from './Home'
import { getAllCountries, getCountryList } from '../ducks/home'
import { emitNotification } from '../ducks/message'

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getAllCountries,
	getCountryList,
	emitNotification
}, dispatch)

const mapStateToProps = (state) => ({
	allCountries: state.home.allCountries,
	countryList: state.home.countryList,
	isFetching: state.home.isFetching,
	show: state.message.show,
	content: state.message.content
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
