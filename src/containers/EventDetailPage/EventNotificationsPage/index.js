import { connect } from 'react-redux';
import EventNotificationsPage from './EventNotificationsPage';
import {
	getEventNotifications,
	resetMeta,
	reset
} from '../../../actions/EventDetailPage/EventNotificationsPage';

const mapsStateToProps = state => ({
	eventNotificationsPageProps: state.eventDetailPage.eventNotificationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventNotifications(options) {
		dispatch(getEventNotifications(options));
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
)(EventNotificationsPage);

