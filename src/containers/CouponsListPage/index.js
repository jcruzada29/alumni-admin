import { connect } from 'react-redux';
import CouponsListPage from './CouponsListPage';
import {
	getCoupons,
	getSearchResult,
	navigateToAddPage,
	navigateToDetailPage,
	resetMeta,
	reset
} from '../../actions/CouponsListPage';

const mapStateToProps = state => ({
	couponsListPageProps: state.couponsListPageReducer
});

const mapDispatchToProps = dispatch => ({
	getCoupons: options => dispatch(getCoupons(options)),
	getSearchResult: options => dispatch(getSearchResult(options)),
	navigateToAddPage: () => dispatch(navigateToAddPage()),
	navigateToDetailPage: options => dispatch(navigateToDetailPage(options)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CouponsListPage);

