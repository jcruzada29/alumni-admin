import { connect } from 'react-redux';
import ParkingPrivilegeListPage from './ParkingPrivilegeListPage';
import {
	getParkingPrivileges,
	navigateToAddPage,
	navigateToDetailPage,
	resetMeta,
	reset
} from '../../actions/ParkingPrivilegeListPage';

const mapStateToProps = (state) => ({
	parkingPrivilegesListPageProps: state.parkingPrivilegesListPageReducer
});

const mapDispatchToProps = (dispatch) => ({
	getParkingPrivileges: options => dispatch(getParkingPrivileges(options)),
	navigateToAddPage: () => dispatch(navigateToAddPage()),
	navigateToDetailPage: options => dispatch(navigateToDetailPage(options)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ParkingPrivilegeListPage);