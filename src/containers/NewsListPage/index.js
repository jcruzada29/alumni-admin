import { connect } from 'react-redux';
import {
	getNews,
	resetMeta, reset
} from '../../actions/NewsListPage';

import NewsListPage from './NewsListPage';

const mapsStateToProps = state => ({
	newsListPageProps: state.newsListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getNews(options) {
		dispatch(getNews(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(reset());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(NewsListPage);

