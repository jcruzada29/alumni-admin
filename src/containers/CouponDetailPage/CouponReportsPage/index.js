import { connect } from 'react-redux';
import CouponReportsPage from './CouponReportsPage';
import { downloadReports, reset, resetMeta } from '../../../actions/CouponDetailPage/CouponReportsPage';

const mapsStateToProps = state => ({
	pageProps: state.couponDetailPage.couponReportsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	downloadReports: query => dispatch(downloadReports(query)),
	reset: () => dispatch(reset()),
	resetMeta: () => dispatch(resetMeta())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(CouponReportsPage);

