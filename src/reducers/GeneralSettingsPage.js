import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	settings: null,
	loading: false,
	loadingSubmit: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_GENERAL_SETTINGS_REQUEST:
		case ActionTypes.GET_GENERAL_SETTINGS_ERROR:
		case ActionTypes.GET_GENERAL_SETTINGS_SUCCESS:
		case ActionTypes.SUBMIT_GENERAL_SETTINGS_REQUEST:
		case ActionTypes.SUBMIT_GENERAL_SETTINGS_ERROR:
		case ActionTypes.SUBMIT_GENERAL_SETTINGS_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_GENERAL_SETTINGS_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_GENERAL_SETTINGS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
