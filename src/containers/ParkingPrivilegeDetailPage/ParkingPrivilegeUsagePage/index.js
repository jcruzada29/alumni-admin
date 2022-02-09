import { connect } from 'react-redux';
import ParkingPrivilegeUsagePage from './ParkingPrivilegeUsagePage';
import {
	getParkingUsage,
	getSearchResult,
	resetMeta,
	reset
} from '../../../actions/ParkingPrivilegeDetailPage/ParkingPrivilegeUsagePage';

const mapStateToProps = state => ({
	parkingPrivilegeUsagePageProps: state.parkingPrivilegeDetailPage.parkingPrivilegeUsagePageReducer
});

const mapDispatchToProps = dispatch => ({
	getParkingUsage(options) {
		dispatch(getParkingUsage(options));
	},
	getSearchResult(options) {
		dispatch(getSearchResult(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ParkingPrivilegeUsagePage);

