import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEventNotificationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.event_notifications.getEventNotificationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { event_notification } = response.data;
		const newEventNotification = { ...event_notification };
		newEventNotification.delivery_date = moment(event_notification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_EVENT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				event_notification: newEventNotification,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { event_notification } = getState().eventDetailPage.eventNotificationDetailPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			event_notification: {
				...fields
			}
		};

		let response;
		if (event_notification) {
			body.event_notification.updated_at = event_notification.updated_at;
			response = await API.event_notifications.updateEventNotificationById(event_notification.id, body);
		} else {
			response = await API.event_notifications.createEventNotification(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_EVENT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { event_notification: newEventNotification } = response.data;
		newEventNotification.delivery_date = moment(newEventNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				event_notification: newEventNotification,
				loadingSubmit: false
			}
		});

		// Redirect to event_notification details
		dispatch(push(`/events/id/notifications/detail?id=${newEventNotification.event_id}&event_notification_id=${newEventNotification.id}`));
	};
}

export function onSchedule(eventNotificationId) {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.SCHEDULE_EVENT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.event_notifications.scheduleEventNotificationById(eventNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SCHEDULE_EVENT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newEventNotification = response.data.event_notification;
		newEventNotification.delivery_date = moment(newEventNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SCHEDULE_EVENT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				event_notification: newEventNotification
			}
		});
	};
}

export function onSend(eventNotificationId) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SEND_EVENT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const response = await API.event_notifications.sendEventNotificationById(eventNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SEND_EVENT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newEventNotification = response.data.event_notification;
		newEventNotification.delivery_date = moment(newEventNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SEND_EVENT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				event_notification: newEventNotification
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_NOTIFICATION_DETAIL_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_NOTIFICATION_DETAIL_PAGE
		});
	};
}