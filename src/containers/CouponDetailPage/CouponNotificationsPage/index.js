import { connect } from 'react-redux';
import CouponNotificationsPage from './CouponNotificationsPage';
import {
	getCouponNotifications,
	resetMeta,
	reset
} from '../../../actions/CouponDetailPage/CouponNotificationsPage';

const mapsStateToProps = state => ({
	couponNotificationsPageProps: state.couponDetailPage.couponNotificationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getCouponNotifications(options) {
		dispatch(getCouponNotifications(options));
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
)(CouponNotificationsPage);

