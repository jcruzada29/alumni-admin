import { connect } from 'react-redux';
import ParkingPrivilegeReportsPage from './ParkingPrivilegeReportsPage';
import { downloadReports, resetMeta, reset } from '../../../actions/ParkingPrivilegeDetailPage/ParkingPrivilegeReportsPage';

const mapStateToProps = (state) => ({
	pageProps: state.parkingPrivilegeDetailPage.parkingPrivilegeReportsPageReducer
});

const mapDispatchToProps = (dispatch) => ({
	downloadReports: query => dispatch(downloadReports(query)),
	reset: () => dispatch(reset()),
	resetMeta: () => dispatch(resetMeta())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ParkingPrivilegeReportsPage);
