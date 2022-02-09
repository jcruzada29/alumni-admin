import { connect } from 'react-redux';
import {
	getCouponById,
	getAssetFileById,
	getMerchants,
	navigateToCouponListPage,
	onSubmit,
	resetMeta,
	reset
} from '../../../actions/CouponDetailPage/CouponBasicPage';
import CouponBasicPage from './CouponBasicPage';

const mapsStateToProps = state => ({
	pageProps: state.couponDetailPage.couponBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getCouponById: id => dispatch(getCouponById(id)),
	getAssetFileById: options => dispatch(getAssetFileById(options)),
	getMerchants: () => dispatch(getMerchants()),
	navigateToCouponListPage: () => dispatch(navigateToCouponListPage()),
	onSubmit: fields => dispatch(onSubmit(fields)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(CouponBasicPage);

