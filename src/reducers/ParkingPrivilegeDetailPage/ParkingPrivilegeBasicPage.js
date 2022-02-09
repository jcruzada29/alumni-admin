import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	parking_privilege: null,
	loading: false,
	loadingSubmit: false,
	hasLoaded: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_PARKING_PRIVILEGE_BASIC_REQUEST:
		case ActionTypes.GET_PARKING_PRIVILEGE_BASIC_SUCCESS:
		case ActionTypes.GET_PARKING_PRIVILEGE_BASIC_ERROR:
		case ActionTypes.SUBMIT_PARKING_PRIVILEGE_BASIC_REQUEST:
		case ActionTypes.SUBMIT_PARKING_PRIVILEGE_BASIC_SUCCESS:
		case ActionTypes.SUBMIT_PARKING_PRIVILEGE_BASIC_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_PARKING_PRIVILEGE_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_PARKING_PRIVILEGE_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
