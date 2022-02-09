import { connect } from 'react-redux';
import {
	getParkingPrivilegeById,
	navigateToParkingPrivilegeListPage,
	onSubmit,
	resetMeta,
	reset
} from '../../../actions/ParkingPrivilegeDetailPage/ParkingPrivilegeBasicPage';
import ParkingPrivilegeBasicPage from './ParkingPrivilegeBasicPage';

const mapStateToProps = state => ({
	pageProps: state.parkingPrivilegeDetailPage.parkingPrivilegeBasicPageReducer
});

const mapDispatchToProps = dispatch => ({
	getParkingPrivilegeById: id => dispatch(getParkingPrivilegeById(id)),
	navigateToParkingPrivilegeListPage: () => dispatch(navigateToParkingPrivilegeListPage()),
	onSubmit: fields => dispatch(onSubmit(fields)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ParkingPrivilegeBasicPage);

