import { connect } from 'react-redux';
import { getMerchants, getMerchantById, getSearchResult, onSubmit, updateForm, emptyForm, resetMeta, resetPage } from '../../actions/MerchantPage';
import MerchantPage from './MerchantPage';

const mapStateToProps = state => ({
	merchantPageProps: state.merchantPageReducer
});

const mapDispatchToProps = dispatch => ({
	getMerchants(options) {
		dispatch(getMerchants(options));
	},
	getMerchantById(id) {
		dispatch(getMerchantById(id));
	},
	getSearchResult(options) {
		dispatch(getSearchResult(options));
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	updateForm() {
		dispatch(updateForm());
	},
	emptyForm() {
		dispatch(emptyForm());
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MerchantPage);
