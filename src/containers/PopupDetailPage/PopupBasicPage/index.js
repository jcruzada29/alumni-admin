import { connect } from 'react-redux';
import PopupBasicPage from './PopupBasicPage';
import { 
	getPopupById,
	getAssetFileById,
	navigateToPopupListPage,
	onSubmit,
	resetMeta,
	reset
} from '../../../actions/PopupDetailPage/PopupBasicPage';

const mapsStateToProps = state => ({
	pageProps: state.popupDetailPage.popupBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getPopupById: id => dispatch(getPopupById(id)),
	getAssetFileById: options => dispatch(getAssetFileById(options)),
	navigateToPopupListPage: () => dispatch(navigateToPopupListPage()),
	onSubmit: fields => dispatch(onSubmit(fields)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(PopupBasicPage);

