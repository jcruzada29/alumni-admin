import { connect } from 'react-redux';
import ParkingPrivilegeNotificationDetailPage from './ParkingPrivilegeNotificationDetailPage';
import {
	getParkingNotificationById,
	onSubmit,
	onSchedule,
	onSend,
	resetMeta,
	reset
} from '../../../actions/ParkingPrivilegeDetailPage/ParkingPrivilegeNotificationDetailPage';

const mapsStateToProps = state => ({
	parkingPrivilegeNotificationDetailPageProps: state.parkingPrivilegeDetailPage.parkingPrivilegeNotificationDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getParkingNotificationById(id) {
		dispatch(getParkingNotificationById(id));
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	onSchedule(options) {
		dispatch(onSchedule(options));
	},
	onSend(options) {
		dispatch(onSend(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(ParkingPrivilegeNotificationDetailPage);

