import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	highlight: null,
	loading: false,
	loadingSubmit: false,
	hasLoaded: false,
	asset: null,
	loadingAsset: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_HIGHLIGHT_BY_ID_REQUEST:
		case ActionTypes.GET_HIGHLIGHT_BY_ID_SUCCESS:
		case ActionTypes.GET_HIGHLIGHT_BY_ID_ERROR:
		case ActionTypes.GET_HIGHLIGHT_BASIC_ASSET_FILE_ERROR:
		case ActionTypes.GET_HIGHLIGHT_BASIC_ASSET_FILE_REQUEST:
		case ActionTypes.GET_HIGHLIGHT_BASIC_ASSET_FILE_SUCCESS:
		case ActionTypes.SUBMIT_HIGHLIGHT_BASIC_ERROR:
		case ActionTypes.SUBMIT_HIGHLIGHT_BASIC_REQUEST:
		case ActionTypes.SUBMIT_HIGHLIGHT_BASIC_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_HIGHLIGHT_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_HIGHLIGHT_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
