import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	reports: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.DOWNLOAD_PARKING_PRIVILEGE_REPORTS_REQUEST:
		case ActionTypes.DOWNLOAD_PARKING_PRIVILEGE_REPORTS_SUCCESS:
		case ActionTypes.DOWNLOAD_PARKING_PRIVILEGE_REPORTS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_DOWNLOAD_PARKING_PRIVILEGE_REPORTS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_DOWNLOAD_PARKING_PRIVILEGE_REPORTS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
