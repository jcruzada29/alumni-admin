import { connect } from 'react-redux';
import PushNotificationBasicPage from './PushNotificationBasicPage';
import {
	getPushNotificationById,
	navigateToPushNotificationListPage,
	onSubmit,
	onSend,
	onSchedule,
	resetMeta,
	reset
} from '../../../actions/PushNotificationDetailPage/PushNotificationBasicPage';

const mapsStateToProps = state => ({
	pageProps: state.pushNotificationDetailPage.pushNotificationBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getPushNotificationById: id => dispatch(getPushNotificationById(id)),
	navigateToPushNotificationListPage: () => dispatch(navigateToPushNotificationListPage()),
	onSubmit: (fields,option) => dispatch(onSubmit(fields, option)),
	onSend(options) {
		dispatch(onSend(options));
	},
	onSchedule(options) {
		dispatch(onSchedule(options));
	},
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(PushNotificationBasicPage);

