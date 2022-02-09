import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	highlight_notifications: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_HIGHLIGHT_NOTIFICATIONS_REQUEST:
		case ActionTypes.GET_HIGHLIGHT_NOTIFICATIONS_SUCCESS:
		case ActionTypes.GET_HIGHLIGHT_NOTIFICATIONS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_HIGHLIGHT_NOTIFICATIONS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_HIGHLIGHT_NOTIFICATIONS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
