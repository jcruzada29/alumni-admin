import { connect } from 'react-redux';
import EventNotificationDetailPage from './EventNotificationDetailPage';
import {
	getEventNotificationById,
	onSubmit,
	onSchedule,
	onSend,
	resetMeta,
	reset
} from '../../../actions/EventDetailPage/EventNotificationDetailPage';

const mapsStateToProps = state => ({
	eventNotificationDetailPageProps: state.eventDetailPage.eventNotificationDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventNotificationById(id) {
		dispatch(getEventNotificationById(id));
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
)(EventNotificationDetailPage);

