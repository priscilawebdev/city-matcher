import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from './Home'
import { getAllCountries, getCountryList } from '../ducks/home'
import { emitNotification, dismissNotification } from '../ducks/message'

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getAllCountries,
	getCountryList,
	emitNotification,
	dismissNotification
}, dispatch)

const mapStateToProps = (state) => ({
	...state.home,
	...state.message
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
