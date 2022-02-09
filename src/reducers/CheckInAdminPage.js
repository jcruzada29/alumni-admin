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
		case ActionTypes.GET_CHECK_IN_ADMIN_REQUEST:
		case ActionTypes.GET_CHECK_IN_ADMIN_SUCCESS:
		case ActionTypes.GET_CHECK_IN_ADMIN_ERROR:
		case ActionTypes.SUBMIT_CHECK_IN_ADMIN_FORM_REQUEST:
		case ActionTypes.SUBMIT_CHECK_IN_ADMIN_FORM_SUCCESS:
		case ActionTypes.SUBMIT_CHECK_IN_ADMIN_FORM_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_CHECK_IN_ADMIN_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_CHECK_IN_ADMIN_PAGE_FORM:
			return {
				...state,
				form: null
			};
		case ActionTypes.RESET_CHECK_IN_ADMIN_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
