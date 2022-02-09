import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	notifications: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_USER_NOTIFICATIONS_REQUEST:
		case ActionTypes.GET_USER_NOTIFICATIONS_ERROR:
		case ActionTypes.GET_USER_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_NOTIFICATIONS:
			return {
				...initialState
			};
		default:
			return state;
	}
}
