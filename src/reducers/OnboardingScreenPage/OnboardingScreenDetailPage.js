import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	loading: false,
	onboardingScreen: null,
	meta: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_ONBOARDINGSCREENS_DETAIL_PAGE_REQUEST:
		case ActionTypes.GET_ONBOARDINGSCREENS_DETAIL_PAGE_SUCCESS:
		case ActionTypes.GET_ONBOARDINGSCREENS_DETAIL_PAGE_ERROR:
		case ActionTypes.SUBMIT_ADD_ONBOARD_SCREEN_REQUEST:
		case ActionTypes.SUBMIT_ADD_ONBOARD_SCREEN_SUCCESS:
		case ActionTypes.SUBMIT_ADD_ONBOARD_SCREEN_ERROR:
		case ActionTypes.GET_ASSET_FILE_REQUEST:
		case ActionTypes.GET_ASSET_FILE_SUCCESS:
		case ActionTypes.GET_ASSET_FILE_ERROR:
		case ActionTypes.GET_ONBOARDINGSCREEN_BY_ID_PAGE_SUCCESS:
		case ActionTypes.GET_ONBOARDINGSCREEN_BY_ID_PAGE_REQUEST:
		case ActionTypes.GET_ONBOARDINGSCREEN_BY_ID_PAGE_ERROR:
		case ActionTypes.DELETE_ONBOARD_SCREEN_REQUEST:
		case ActionTypes.DELETE_ONBOARD_SCREEN_SUCCESS:
		case ActionTypes.DELETE_ONBOARD_SCREEN_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ONBOARDINGSCREENS_DETAIL_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ONBOARDINGSCREENS_DETAIL_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
