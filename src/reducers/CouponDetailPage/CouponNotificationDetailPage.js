import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	coupon_notification: null,
	loading: false,
	loadingSubmit: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_COUPON_NOTIFICATION_DETAIL_REQUEST:
		case ActionTypes.GET_COUPON_NOTIFICATION_DETAIL_SUCCESS:
		case ActionTypes.GET_COUPON_NOTIFICATION_DETAIL_ERROR:
		case ActionTypes.SUBMIT_COUPON_NOTIFICATION_DETAIL_REQUEST:
		case ActionTypes.SUBMIT_COUPON_NOTIFICATION_DETAIL_SUCCESS:
		case ActionTypes.SUBMIT_COUPON_NOTIFICATION_DETAIL_ERROR:
		case ActionTypes.SCHEDULE_COUPON_NOTIFICATION_DETAIL_REQUEST:
		case ActionTypes.SCHEDULE_COUPON_NOTIFICATION_DETAIL_SUCCESS:
		case ActionTypes.SCHEDULE_COUPON_NOTIFICATION_DETAIL_ERROR:
		case ActionTypes.SEND_COUPON_NOTIFICATION_DETAIL_REQUEST:
		case ActionTypes.SEND_COUPON_NOTIFICATION_DETAIL_SUCCESS:
		case ActionTypes.SEND_COUPON_NOTIFICATION_DETAIL_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_COUPON_NOTIFICATION_DETAIL_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_COUPON_NOTIFICATION_DETAIL_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
