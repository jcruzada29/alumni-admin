import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getPushNotificationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_PUSH_NOTIFICATION_BY_ID_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.push_notifications.getPushNotificationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PUSH_NOTIFICATION_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { push_notification } = response.data;

		push_notification.delivery_date = moment(push_notification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_PUSH_NOTIFICATION_BY_ID_SUCCESS,
			payload: {
				push_notification,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function onSubmit(fields, option) {
	return async (dispatch, getState) => {
		const { push_notification } = getState().pushNotificationDetailPage.pushNotificationBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			push_notification: {
				...fields
			}
		};

		let response;
		if (push_notification) {
			body.push_notification.updated_at = push_notification.updated_at;
			response = await API.push_notifications.updatePushNotificationById(push_notification.id, body);
		} else {
			response = await API.push_notifications.createPushNotification(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { push_notification: newPushNotification } = response.data;
		newPushNotification.delivery_date = moment(newPushNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				push_notification: newPushNotification,
				loadingSubmit: false
			}
		});

		// Redirect to details basic page
		dispatch(push(`/push-notifications/id/basic?id=${newPushNotification.id}`));
	};
}


export function onSchedule(pushNotificationId) {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.push_notifications.schedulePushNotificationById(pushNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newPushNotification = response.data.push_notification;
		newPushNotification.delivery_date = moment(newPushNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				push_notification: newPushNotification
			}
		});
	};
}

export function onSend(pushNotificationId) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const response = await API.push_notifications.sendPushNotificationById(pushNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newPushNotification = response.data.push_notification;
		newPushNotification.delivery_date = moment(newPushNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_PUSH_NOTIFICATION_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				push_notification: newPushNotification
			}
		});
	};
}

export function navigateToPushNotificationListPage() {
	return async dispatch => {
		dispatch(push(`/push-notifications`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PUSH_NOTIFICATION_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PUSH_NOTIFICATION_BASIC_PAGE
		});
	};
}