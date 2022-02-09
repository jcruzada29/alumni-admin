import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getCouponNotifications({ coupon_id, page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`id=${coupon_id}`,
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/coupons/id/notifications?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_COUPON_NOTIFICATIONS_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.coupon_notifications.getCouponNotifications({
			coupon_id,
			page: page,
			limit: limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPON_NOTIFICATIONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { coupon_notifications } = response.data;

		dispatch({
			type: ActionTypes.GET_COUPON_NOTIFICATIONS_SUCCESS,
			payload: {
				coupon_notifications,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_NOTIFICATIONS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_NOTIFICATIONS_PAGE
		});
	};
}