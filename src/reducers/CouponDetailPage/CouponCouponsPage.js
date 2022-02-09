import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	coupon_coupons: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0,
	loadingDelete: false,
	hasDeleted: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_COUPON_COUPONS_REQUEST:
		case ActionTypes.GET_COUPON_COUPONS_SUCCESS:
		case ActionTypes.GET_COUPON_COUPONS_ERROR:
		case ActionTypes.DELETE_COUPON_COUPONS_REQUEST:
		case ActionTypes.DELETE_COUPON_COUPONS_SUCCESS:
		case ActionTypes.DELETE_COUPON_COUPONS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_COUPON_COUPONS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_COUPON_COUPONS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
