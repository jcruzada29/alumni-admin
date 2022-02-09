import { connect } from 'react-redux';
import {
	getAdminById,
	deleteAdminById,
	navigateToAdminListPage,
	onSubmit,
	resetMeta,
	reset
} from '../../actions/AdminDetailPage';
import AdminDetailPage from './AdminDetailPage';

const mapsStateToProps = state => ({
	pageProps: state.adminDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAdminById: (id) => dispatch(getAdminById(id)),
	deleteAdminById: (id) => dispatch(deleteAdminById(id)),
	navigateToAdminListPage: () => dispatch(navigateToAdminListPage()),
	onSubmit: fields => dispatch(onSubmit(fields)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AdminDetailPage);

