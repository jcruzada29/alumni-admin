import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	parking_usage: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_PARKING_USAGE_REQUEST:
		case ActionTypes.GET_PARKING_USAGE_SUCCESS:
		case ActionTypes.GET_PARKING_USAGE_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_PARKING_USAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_PARKING_USAGE_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
