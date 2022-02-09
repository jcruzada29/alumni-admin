import { connect } from 'react-redux';
import {
	resetMeta, resetPage, onSubmit, getNewsById, getAssetFileById
} from '../../../actions/NewsDetailPage/NewsBasicPage';

import NewsBasicPage from './NewsBasicPage';

const mapsStateToProps = state => ({
	newsBasicPageProps: state.newsDetailPage.newsBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getNewsById(options){
		dispatch(getNewsById(options));
	},
	getAssetFileById(options){
		dispatch(getAssetFileById(options));
	},
	onSubmit(options){
		dispatch(onSubmit(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(NewsBasicPage);

