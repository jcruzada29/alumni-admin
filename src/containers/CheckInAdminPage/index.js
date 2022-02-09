import { connect } from 'react-redux';
import { getCheckInAdmins, getCheckInAdminById, onSubmit, updateForm, emptyForm, resetMeta, resetPage } from '../../actions/CheckInAdminPage';
import CheckInAdminPage from './CheckInAdminPage';

const mapStateToProps = state => ({
	checkInAdminPageProps: state.checkInAdminPageReducer
});

const mapDispatchToProps = dispatch => ({
	getCheckInAdmins(options) {
		dispatch(getCheckInAdmins(options));
	},
	getCheckInAdminById(id) {
		dispatch(getCheckInAdminById(id));
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	updateForm() {
		dispatch(updateForm());
	},
	emptyForm() {
		dispatch(emptyForm());
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckInAdminPage);