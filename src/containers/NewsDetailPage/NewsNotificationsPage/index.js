import { connect } from 'react-redux';
import NewsNotificationsPage from './NewsNotificationsPage';
import {
	getNewsNotifications,
	resetMeta,
	reset
} from '../../../actions/NewsDetailPage/NewsNotificationsPage';

const mapsStateToProps = state => ({
	newsNotificationsPageProps: state.newsDetailPage.newsNotificationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getNewsNotifications(options) {
		dispatch(getNewsNotifications(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(NewsNotificationsPage);

