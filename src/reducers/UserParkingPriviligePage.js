import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	parking_privilige: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_USER_PARKING_PRIVILIGES_REQUEST:
		case ActionTypes.GET_USER_PARKING_PRIVILIGES_ERROR:
		case ActionTypes.GET_USER_PARKING_PRIVILIGES_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_PARKING_PRIVILIGES:
			return {
				...initialState
			};
		default:
			return state;
	}
}
