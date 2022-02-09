import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	users: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_USERS_REQUEST:
		case ActionTypes.GET_USERS_ERROR:
		case ActionTypes.GET_USERS_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USERS_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_USERS_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
