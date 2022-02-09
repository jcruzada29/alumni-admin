import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	coupon: null,
	loading: false,
	loadingSubmit: false,
	hasLoaded: false,

	asset: null,
	loadingAsset: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_COUPON_BASIC_REQUEST:
		case ActionTypes.GET_COUPON_BASIC_SUCCESS:
		case ActionTypes.GET_COUPON_BASIC_ERROR:
		case ActionTypes.GET_MERCHANT_REQUEST:
		case ActionTypes.GET_MERCHANT_SUCCESS:
		case ActionTypes.GET_MERCHANT_ERROR:
		case ActionTypes.GET_COUPON_BASIC_ASSET_FILE_REQUEST:
		case ActionTypes.GET_COUPON_BASIC_ASSET_FILE_SUCCESS:
		case ActionTypes.GET_COUPON_BASIC_ASSET_FILE_ERROR:
		case ActionTypes.SUBMIT_COUPON_BASIC_REQUEST:
		case ActionTypes.SUBMIT_COUPON_BASIC_SUCCESS:
		case ActionTypes.SUBMIT_COUPON_BASIC_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_COUPON_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_COUPON_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
