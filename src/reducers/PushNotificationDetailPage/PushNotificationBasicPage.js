import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	push_noticiation: null,
	loading: false,
	loadingSubmit: false,
	hasLoaded: false,
	asset: null,
	loadingAsset: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_PUSH_NOTIFICATION_BY_ID_REQUEST:
		case ActionTypes.GET_PUSH_NOTIFICATION_BY_ID_SUCCESS:
		case ActionTypes.GET_PUSH_NOTIFICATION_BY_ID_ERROR:
		case ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_REQUEST:
		case ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_SUCCESS:
		case ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_ERROR:
		
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_PUSH_NOTIFICATION_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_PUSH_NOTIFICATION_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
