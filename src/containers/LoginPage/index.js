import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import { onFieldChange, login, reset, showLoginForm } from '../../actions/LoginPage';

const mapsStateToProps = state => ({
	loginPageProps: state.loginPageReducer
});

const mapsDispatchToProps = dispatch => ({
	onFieldChange(fieldName, fieldValue) {
		dispatch(onFieldChange(fieldName, fieldValue));
	},
	login(opts) {
		dispatch(login(opts));
	},
	reset() {
		dispatch(reset());
	},
	showLoginForm(opts) {
		dispatch(showLoginForm(opts));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LoginPage);
