import { connect } from 'react-redux';
import EventsListPage from './EventsListPage';
import {
	getEvents,
	navigateToAddPage,
	navigateToDetailPage,
	resetMeta,
	reset
} from '../../actions/EventsListPage';

const mapsStateToProps = state => ({
	eventsListPageProps: state.eventsListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEvents: options => dispatch(getEvents(options)),
	navigateToAddPage: () => dispatch(navigateToAddPage()),
	navigateToDetailPage: options => dispatch(navigateToDetailPage(options)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventsListPage);

