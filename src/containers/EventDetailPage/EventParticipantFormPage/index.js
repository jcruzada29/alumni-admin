import { connect } from 'react-redux';
import EventParticipantFormPage from './EventParticipantFormPage';
import {
	getEventFormFields,
	getEventFormFieldById,
	onSubmit,
	onDeleteEventFormFieldById,
	setnNullSelectedEventFormField,
	resetMeta,
	reset
} from '../../../actions/EventDetailPage/EventParticipantFormPage';

const mapsStateToProps = state => ({
	pageProps: state.eventDetailPage.eventParticipantFormPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventFormFields: options => dispatch(getEventFormFields(options)),
	getEventFormFieldById: id => dispatch(getEventFormFieldById(id)),
	onSubmit: fields => dispatch(onSubmit(fields)),
	onDeleteEventFormFieldById: id => dispatch(onDeleteEventFormFieldById(id)),
	setnNullSelectedEventFormField: () => dispatch(setnNullSelectedEventFormField()),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventParticipantFormPage);

