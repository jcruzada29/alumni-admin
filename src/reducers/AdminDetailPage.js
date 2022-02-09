import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	admin: null,
	loading: false,
	loadingSubmit: false,
	loadingDelete: false,
	hasLoaded: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_ADMIN_DETAIL_REQUEST:
		case ActionTypes.GET_ADMIN_DETAIL_SUCCESS:
		case ActionTypes.GET_ADMIN_DETAIL_ERROR:
		case ActionTypes.SUBMIT_ADMIN_DETAIL_REQUEST:
		case ActionTypes.SUBMIT_ADMIN_DETAIL_SUCCESS:
		case ActionTypes.SUBMIT_ADMIN_DETAIL_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ADMIN_DETAIL_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ADMIN_DETAIL_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
