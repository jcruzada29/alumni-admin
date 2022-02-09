import * as ActionTypes from './../../constants/ActionTypes';

const initialState = {
	event_registrations: [],
	selected_event_registration: {},
	loadingDetailPage: false,
	loading: false,
	hasLoaded: false

};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_EVENT_REGISTRATIONS_REQUEST:
		case ActionTypes.GET_EVENT_REGISTRATIONS_SUCCESS:
		case ActionTypes.GET_EVENT_REGISTRATIONS_ERROR:
		case ActionTypes.GET_EVENT_REGISTRATION_DETAIL_ERROR:
		case ActionTypes.GET_EVENT_REGISTRATION_DETAIL_REQUEST:
		case ActionTypes.GET_EVENT_REGISTRATION_DETAIL_SUCCESS:
		case ActionTypes.UPDATE_TRANSACTION_ERROR:
		case ActionTypes.UPDATE_TRANSACTION_REQUEST:
		case ActionTypes.UPDATE_TRANSACTION_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EVENT_REGISTRATIONS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_EVENT_REGISTRATIONS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
