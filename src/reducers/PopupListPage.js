import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	popups: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_POPUPS_REQUEST:
		case ActionTypes.GET_POPUPS_SUCCESS:
		case ActionTypes.GET_POPUPS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_POPUP_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_POPUP_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
