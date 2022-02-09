import { connect } from 'react-redux';
import HighlightBasicPage from './HighlightBasicPage';
import { 
	getHighlightById,
	getAssetFileById,
	navigateToHighlightListPage,
	onSubmit,
	resetMeta,
	reset
} from '../../../actions/HighlightDetailPage/HighlightBasicPage';

const mapsStateToProps = state => ({
	pageProps: state.highlightDetailPage.highlightBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getHighlightById: id => dispatch(getHighlightById(id)),
	getAssetFileById: options => dispatch(getAssetFileById(options)),
	navigateToHighlightListPage: () => dispatch(navigateToHighlightListPage()),
	onSubmit: fields => dispatch(onSubmit(fields)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(HighlightBasicPage);

