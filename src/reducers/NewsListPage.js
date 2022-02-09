import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	news: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_NEWS_PAGE_REQUEST:
		case ActionTypes.GET_NEWS_PAGE_ERROR:
		case ActionTypes.GET_NEWS_PAGE_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_NEWS_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_NEWS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
