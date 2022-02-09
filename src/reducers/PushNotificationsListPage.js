import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	push_notifications: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_PUSH_NOTIFICATIONS_REQUEST:
		case ActionTypes.GET_PUSH_NOTIFICATIONS_SUCCESS:
		case ActionTypes.GET_PUSH_NOTIFICATIONS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_PUSH_NOTIFICATIONS_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_PUSH_NOTIFICATIONS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
