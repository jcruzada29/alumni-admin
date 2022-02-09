import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	loading: false,
	onboardingScreens: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_ONBOARDINGSCREENS_PAGE_REQUEST:
		case ActionTypes.GET_ONBOARDINGSCREENS_PAGE_SUCCESS:
		case ActionTypes.GET_ONBOARDINGSCREENS_PAGE_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ONBOARDINGSCREENS_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ONBOARDINGSCREENS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
