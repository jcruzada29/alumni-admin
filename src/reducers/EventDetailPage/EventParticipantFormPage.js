import * as ActionTypes from './../../constants/ActionTypes';

const initialState = {
	event_form_fields: [],
	loading: false,

	selected_event_form_field: null,
	loadingEventFormField: false,
	hasLoadedEventFormField: false,

	loadingSubmit: false,
	hasSubmitted: false,

	loadingDelete: false,
	hasDeleted: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_EVENT_FORM_FIELDS_REQUEST:
		case ActionTypes.GET_EVENT_FORM_FIELDS_SUCCESS:
		case ActionTypes.GET_EVENT_FORM_FIELDS_ERROR:
		case ActionTypes.SET_NULL_EVENT_FORM_FIELD:
		case ActionTypes.GET_EVENT_FORM_FIELD_BY_ID_REQUEST:
		case ActionTypes.GET_EVENT_FORM_FIELD_BY_ID_SUCCESS:
		case ActionTypes.GET_EVENT_FORM_FIELD_BY_ID_ERROR:
		case ActionTypes.SUBMIT_EVENT_FORM_FIELD_REQUEST:
		case ActionTypes.SUBMIT_EVENT_FORM_FIELD_SUCCESS:
		case ActionTypes.SUBMIT_EVENT_FORM_FIELD_ERROR:
		case ActionTypes.DELETE_EVENT_FORM_FIELD_REQUEST:
		case ActionTypes.DELETE_EVENT_FORM_FIELD_SUCCESS:
		case ActionTypes.DELETE_EVENT_FORM_FIELD_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EVENT_PARTICIPANT_FORM_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_EVENT_PARTICIPANT_FORM_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
