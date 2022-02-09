import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	news_notifications: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_NEWS_NOTIFICATIONS_REQUEST:
		case ActionTypes.GET_NEWS_NOTIFICATIONS_SUCCESS:
		case ActionTypes.GET_NEWS_NOTIFICATIONS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_NEWS_NOTIFICATIONS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_NEWS_NOTIFICATIONS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
