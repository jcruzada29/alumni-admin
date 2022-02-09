import { connect } from 'react-redux';

import UserParkingPrivilegesPage from './UserParkingPrivilegesPage';
import { getParkingPriviligesByUser, reset } from '../../../actions/UsersPage/UserParkingPriviligesPage';

const mapsStateToProps = state => ({
	userParkingPriviligePageReducer: state.userParkingPriviligePageReducer
});

const mapsDispatchToProps = dispatch => ({
	getParkingPriviligesByUser: id => dispatch(getParkingPriviligesByUser(id)),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserParkingPrivilegesPage);

