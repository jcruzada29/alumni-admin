import { connect } from 'react-redux';

import UserCouponPage from './UserCouponPage';
import { getCouponsByUser, reset } from '../../../actions/UsersPage/UserCouponPage';

const mapsStateToProps = state => ({
	userCouponPageReducer: state.userCouponPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getCouponsByUser: id => dispatch(getCouponsByUser(id)),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserCouponPage);

