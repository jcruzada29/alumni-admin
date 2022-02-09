import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	user: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_USER_REQUEST:
		case ActionTypes.GET_USER_ERROR:
		case ActionTypes.GET_USER_SUCCESS:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}
