import { connect } from 'react-redux';
import ParkingNotificationsPage from './ParkingPrivilegeNotificationsPage';
import {
	getParkingNotifications,
	resetMeta,
	reset
} from '../../../actions/ParkingPrivilegeDetailPage/ParkingPrivilegeNotificationsPage';

const mapsStateToProps = state => ({
	parkingPrivilegeNotificationsPageProps: state.parkingPrivilegeDetailPage.parkingPrivilegeNotificationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getParkingNotifications(options) {
		dispatch(getParkingNotifications(options));
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
)(ParkingNotificationsPage);

