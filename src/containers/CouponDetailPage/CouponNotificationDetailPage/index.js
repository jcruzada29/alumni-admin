import { connect } from 'react-redux';
import CouponNotificationDetailPage from './CouponNotificationDetailPage';
import {
	getCouponNotificationById,
	onSubmit,
	onSchedule,
	onSend,
	resetMeta,
	reset
} from '../../../actions/CouponDetailPage/CouponNotificationDetailPage';

const mapsStateToProps = state => ({
	couponNotificationDetailPageProps: state.couponDetailPage.couponNotificationDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getCouponNotificationById(id) {
		dispatch(getCouponNotificationById(id));
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
)(CouponNotificationDetailPage);

