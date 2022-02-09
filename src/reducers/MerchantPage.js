import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	loadingSubmit: false,
	loadingForm: false,

	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_MERCHANT_REQUEST:
		case ActionTypes.GET_MERCHANT_SUCCESS:
		case ActionTypes.GET_MERCHANT_ERROR:
		case ActionTypes.SUBMIT_MERCHANT_FORM_REQUEST:
		case ActionTypes.SUBMIT_MERCHANT_FORM_SUCCESS:
		case ActionTypes.SUBMIT_MERCHANT_FORM_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_MERCHANT_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_MERCHANT_PAGE_FORM:
			return {
				...state,
				form: null
			};
		case ActionTypes.RESET_MERCHANT_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}