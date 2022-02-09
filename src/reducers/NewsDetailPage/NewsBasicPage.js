import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	loading: false,
	news: null,
	meta: null,
	
	asset: null,
	loadingAsset: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_NEWS_BY_ID_SUCCESS:
		case ActionTypes.GET_NEWS_BY_ID_ERROR:
		case ActionTypes.GET_NEWS_BY_ID_REQUEST:
		case ActionTypes.GET_ASSET_FILE_REQUEST:
		case ActionTypes.GET_ASSET_FILE_SUCCESS:
		case ActionTypes.GET_ASSET_FILE_ERROR:
		case ActionTypes.CREATE_NEWS_SUCCESS:
		case ActionTypes.CREATE_NEWS_REQUEST:
		case ActionTypes.CREATE_NEWS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_NEWS_DETAIL_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_NEWS_DETAIL_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
