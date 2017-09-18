import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from './Home'
import { SelectMessage, SelectHome } from './selectors'
import { getAllCountries, getCountryList } from '../ducks/home'
import { emitNotification, dismissNotification } from '../ducks/message'

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getAllCountries,
	getCountryList,
	emitNotification,
	dismissNotification
}, dispatch)

const mapStateToProps = (state) => ({
	...SelectHome(state),
	...SelectMessage(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
