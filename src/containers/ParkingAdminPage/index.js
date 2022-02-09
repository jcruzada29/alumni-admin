import { connect } from 'react-redux';
import { getParkingAdmins, getParkingAdminById, onSubmit, updateForm, emptyForm, resetMeta } from '../../actions/ParkingAdminPage';
import ParkingAdminPage from './ParkingAdminPage';

const mapStateToProps = state => ({
	parkingAdminPageProps: state.parkingAdminPageReducer
});

const mapDispatchToProps = dispatch => ({
	getParkingAdmins(options) {
		dispatch(getParkingAdmins(options));
	},
	getParkingAdminById(id) {
		dispatch(getParkingAdminById(id));
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
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ParkingAdminPage);