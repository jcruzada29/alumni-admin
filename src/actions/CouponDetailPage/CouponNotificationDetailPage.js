import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getCouponNotificationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_COUPON_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.coupon_notifications.getCouponNotificationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPON_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { coupon_notification } = response.data;
		const newCouponNotification = { ...coupon_notification };
		newCouponNotification.delivery_date = moment(coupon_notification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_COUPON_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				coupon_notification: newCouponNotification,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { coupon_notification } = getState().couponDetailPage.couponNotificationDetailPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_COUPON_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			coupon_notification: {
				...fields
			}
		};

		let response;
		if (coupon_notification) {
			body.coupon_notification.updated_at = coupon_notification.updated_at;
			response = await API.coupon_notifications.updateCouponNotificationById(coupon_notification.id, body);
		} else {
			response = await API.coupon_notifications.createCouponNotification(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_COUPON_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { coupon_notification: newCouponNotification } = response.data;
		newCouponNotification.delivery_date = moment(newCouponNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_COUPON_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				coupon_notification: newCouponNotification,
				loadingSubmit: false
			}
		});

		// Redirect to coupon_notification details
		dispatch(push(`/coupons/id/notifications/detail?id=${newCouponNotification.coupon_id}&coupon_notification_id=${newCouponNotification.id}`));
	};
}

export function onSchedule(couponNotificationId) {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.SCHEDULE_COUPON_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.coupon_notifications.scheduleCouponNotificationById(couponNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SCHEDULE_COUPON_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newCouponNotification = response.data.coupon_notification;
		newCouponNotification.delivery_date = moment(newCouponNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SCHEDULE_COUPON_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				coupon_notification: newCouponNotification
			}
		});
	};
}

export function onSend(couponNotificationId) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SEND_COUPON_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const response = await API.coupon_notifications.sendCouponNotificationById(couponNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SEND_COUPON_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newCouponNotification = response.data.coupon_notification;
		newCouponNotification.delivery_date = moment(newCouponNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SEND_COUPON_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				coupon_notification: newCouponNotification
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_NOTIFICATION_DETAIL_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_NOTIFICATION_DETAIL_PAGE
		});
	};
}