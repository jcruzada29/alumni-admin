import { connect } from 'react-redux';
import NewsNotificationDetailPage from './NewsNotificationDetailPage';
import {
	getNewsNotificationById,
	onSubmit,
	onSchedule,
	onSend,
	resetMeta,
	reset
} from '../../../actions/NewsDetailPage/NewsNotificationDetailPage';

const mapsStateToProps = state => ({
	newsNotificationDetailPageProps: state.newsDetailPage.newsNotificationDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getNewsNotificationById(id) {
		dispatch(getNewsNotificationById(id));
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	onSchedule(options) {
		dispatch(onSchedule(options));
	},
	onSend(options) {
		dispatch(onSend(options));
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
)(NewsNotificationDetailPage);

