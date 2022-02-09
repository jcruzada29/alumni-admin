import { connect } from 'react-redux';
import EventRegistrationsPage from './EventRegistrationsPage';
import {
	getEventRegistrations,
	getEventRegistrationById,
	updateTransactionById,
	resetMeta,
	reset
} from '../../../actions/EventDetailPage/EventRegistrationsPage';

const mapsStateToProps = state => ({
	pageProps: state.eventDetailPage.eventRegistrationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventRegistrations: options => dispatch(getEventRegistrations(options)),
	getEventRegistrationById: id => dispatch(getEventRegistrationById(id)),
	updateTransactionById: options => dispatch(updateTransactionById(options)),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventRegistrationsPage);

