import { connect } from 'react-redux';
import AdminsListPage from './AdminsListPage';
import {getAdmins, navigateToDetailPage, resetMeta, reset} from '../../actions/AdminsListPage';


const mapStateToProps = state => ({
	adminListPageProps: state.adminsListPageReducer
});

const mapDispatchToProps = dispatch => ({
	getAdmins(options) {
		dispatch(getAdmins(options));
	},
	navigateToDetailPage(options) {
		dispatch(navigateToDetailPage(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminsListPage);

