import { connect } from 'react-redux';
import CouponCouponsPage from './CouponCouponsPage';
import {
	getCouponCoupons,
	getSearchResult,
	onDeleteCouponSubscriptionById,
	resetMeta,
	reset
} from '../../../actions/CouponDetailPage/CouponCouponsPage';

const mapsStateToProps = state => ({
	couponCouponsPageProps: state.couponDetailPage.couponCouponsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getCouponCoupons(options) {
		dispatch(getCouponCoupons(options));
	},
	getSearchResult(options) {
		dispatch(getSearchResult(options));
	},
	onDeleteCouponSubscriptionById(id) {
		dispatch(onDeleteCouponSubscriptionById(id));
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
)(CouponCouponsPage);

