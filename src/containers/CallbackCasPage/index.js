import { connect } from 'react-redux';
import CallbackCasPage from './CallbackCasPage';
import { authorizeWithTicket } from '../../actions/CallbackCasPage';

const mapsStateToProps = state => ({
	callbackCasPageProps: state.callbackCasPageReducer
});

const mapsDispatchToProps = dispatch => ({
	authorizeWithTicket(param) {
		dispatch(authorizeWithTicket(param));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(CallbackCasPage);
