import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getParkingNotificationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_PARKING_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.parking_notifications.getParkingNotificationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { parking_notification } = response.data;
		const newParkingNotification = { ...parking_notification };
		newParkingNotification.delivery_date = moment(parking_notification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_PARKING_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				parking_notification: newParkingNotification,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { parking_notification } = getState().parkingPrivilegeDetailPage.parkingPrivilegeNotificationDetailPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_PARKING_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			parking_notification: {
				...fields
			}
		};

		let response;
		if (parking_notification) {
			body.parking_notification.updated_at = parking_notification.updated_at;
			response = await API.parking_notifications.updateParkingNotificationById(parking_notification.id, body);
		} else {
			response = await API.parking_notifications.createParkingNotification(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_PARKING_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { parking_notification: newParkingNotification } = response.data;
		newParkingNotification.delivery_date = moment(newParkingNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_PARKING_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				parking_notification: newParkingNotification,
				loadingSubmit: false
			}
		});

		// Redirect to parking_notification details
		dispatch(push(`/parking-privileges/id/notifications/detail?id=${newParkingNotification.parking_id}&parking_notification_id=${newParkingNotification.id}`));
	};
}

export function onSchedule(parkingNotificationId) {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.SCHEDULE_PARKING_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.parking_notifications.scheduleParkingNotificationById(parkingNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SCHEDULE_PARKING_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newParkingNotification = response.data.parking_notification;
		newParkingNotification.delivery_date = moment(newParkingNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SCHEDULE_PARKING_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				parking_notification: newParkingNotification
			}
		});
	};
}

export function onSend(parkingNotificationId) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SEND_PARKING_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const response = await API.parking_notifications.sendParkingNotificationById(parkingNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SEND_PARKING_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newParkingNotification = response.data.parking_notification;
		newParkingNotification.delivery_date = moment(newParkingNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SEND_PARKING_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				parking_notification: newParkingNotification
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_NOTIFICATION_DETAIL_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_NOTIFICATION_DETAIL_PAGE
		});
	};
}