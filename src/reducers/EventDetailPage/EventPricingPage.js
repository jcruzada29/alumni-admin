import * as ActionTypes from './../../constants/ActionTypes';

const initialState = {
	event_price_groups: [],
	loading: false,
	hasLoaded: false,

	selected_event_price_group: null,
	loadingEventPriceGroup: false,
	hasLoadedEventPriceGroup: false,

	event_user_types: [],
	loadingEventUserTypes: false,

	loadingSubmit: false,
	hasSubmitted: false,

	loadingDelete: false,
	hasDeleted: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_EVENT_PRICE_GROUPS_REQUEST:
		case ActionTypes.GET_EVENT_PRICE_GROUPS_SUCCESS:
		case ActionTypes.GET_EVENT_PRICE_GROUPS_ERROR:
		case ActionTypes.SET_NULL_EVENT_PRICE_GROUP:
		case ActionTypes.GET_EVENT_PRICE_GROUP_BY_ID_REQUEST:
		case ActionTypes.GET_EVENT_PRICE_GROUP_BY_ID_SUCCESS:
		case ActionTypes.GET_EVENT_PRICE_GROUP_BY_ID_ERROR:
		case ActionTypes.GET_EVENT_PRICING_USER_TYPES_REQUEST:
		case ActionTypes.GET_EVENT_PRICING_USER_TYPES_SUCCESS:
		case ActionTypes.GET_EVENT_PRICING_USER_TYPES_ERROR:
		case ActionTypes.SUBMIT_EVENT_PRICE_GROUP_REQUEST:
		case ActionTypes.SUBMIT_EVENT_PRICE_GROUP_SUCCESS:
		case ActionTypes.SUBMIT_EVENT_PRICE_GROUP_ERROR:
		case ActionTypes.DELETE_EVENT_PRICE_GROUP_REQUEST:
		case ActionTypes.DELETE_EVENT_PRICE_GROUP_SUCCESS:
		case ActionTypes.DELETE_EVENT_PRICE_GROUP_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EVENT_PRICING_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_EVENT_PRICING_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
