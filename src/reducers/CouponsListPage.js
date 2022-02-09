import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	coupons: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_COUPONS_LIST_REQUEST:
		case ActionTypes.GET_COUPONS_LIST_SUCCESS:
		case ActionTypes.GET_COUPONS_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_COUPONS_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_COUPONS_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
