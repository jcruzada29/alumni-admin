import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	events: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_USER_EVENT_REQUEST:
		case ActionTypes.GET_USER_EVENT_ERROR:
		case ActionTypes.GET_USER_EVENT_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_EVENT:
			return {
				...initialState
			};
		default:
			return state;
	}
}
