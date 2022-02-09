import * as ActionTypes from './../../constants/ActionTypes';

const initialState = {
	event: null,
	loading: false,
	loadingSubmit: false,
	hasLoaded: false,

	asset: null,
	loadingAsset: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_EVENT_BASIC_REQUEST:
		case ActionTypes.GET_EVENT_BASIC_SUCCESS:
		case ActionTypes.GET_EVENT_BASIC_ERROR:
		case ActionTypes.GET_EVENT_BASIC_ASSET_FILE_REQUEST:
		case ActionTypes.GET_EVENT_BASIC_ASSET_FILE_SUCCESS:
		case ActionTypes.GET_EVENT_BASIC_ASSET_FILE_ERROR:
		case ActionTypes.SUBMIT_EVENT_BASIC_REQUEST:
		case ActionTypes.SUBMIT_EVENT_BASIC_SUCCESS:
		case ActionTypes.SUBMIT_EVENT_BASIC_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EVENT_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_EVENT_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
