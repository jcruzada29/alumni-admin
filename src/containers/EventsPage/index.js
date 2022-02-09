import { connect } from 'react-redux';
import {
	getEvents,
	resetMeta, resetPage
} from '../../actions/EventsPage/EventsPage';

import EventsPage from './EventsPage';

const mapsStateToProps = state => ({
	eventsPageProps: state.eventsPage.eventsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEvents(options) {
		dispatch(getEvents(options));
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
)(EventsPage);

