import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	coupons: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_USER_COUPON_REQUEST:
		case ActionTypes.GET_USER_COUPON_ERROR:
		case ActionTypes.GET_USER_COUPON_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_COUPON:
			return {
				...initialState
			};
		default:
			return state;
	}
}
