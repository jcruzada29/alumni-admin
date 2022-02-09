import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getHighlightNotificationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.highlight_notifications.getHighlightNotificationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_HIGHLIGHT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { highlight_notification } = response.data;
		const newHighlightNotification = { ...highlight_notification };
		newHighlightNotification.delivery_date = moment(highlight_notification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				highlight_notification: newHighlightNotification,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { highlight_notification } = getState().highlightDetailPage.highlightNotificationDetailPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_HIGHLIGHT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			highlight_notification: {
				...fields
			}
		};

		let response;
		if (highlight_notification) {
			body.highlight_notification.updated_at = highlight_notification.updated_at;
			response = await API.highlight_notifications.updateHighlightNotificationById(highlight_notification.id, body);
		} else {
			response = await API.highlight_notifications.createHighlightNotification(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_HIGHLIGHT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { highlight_notification: newHighlightNotification } = response.data;
		newHighlightNotification.delivery_date = moment(newHighlightNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_HIGHLIGHT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				highlight_notification: newHighlightNotification,
				loadingSubmit: false
			}
		});

		// Redirect to highlight_notification details
		dispatch(push(`/highlights/id/notifications/detail?id=${newHighlightNotification.highlight_id}&highlight_notification_id=${newHighlightNotification.id}`));
	};
}

export function onSchedule(highlightNotificationId) {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.SCHEDULE_HIGHLIGHT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.highlight_notifications.scheduleHighlightNotificationById(highlightNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SCHEDULE_HIGHLIGHT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newHighlightNotification = response.data.highlight_notification;
		newHighlightNotification.delivery_date = moment(newHighlightNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SCHEDULE_HIGHLIGHT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				highlight_notification: newHighlightNotification
			}
		});
	};
}

export function onSend(highlightNotificationId) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SEND_HIGHLIGHT_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const response = await API.highlight_notifications.sendHighlightNotificationById(highlightNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SEND_HIGHLIGHT_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newHighlightNotification = response.data.highlight_notification;
		newHighlightNotification.delivery_date = moment(newHighlightNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SEND_HIGHLIGHT_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				highlight_notification: newHighlightNotification
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_HIGHLIGHT_NOTIFICATION_DETAIL_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_HIGHLIGHT_NOTIFICATION_DETAIL_PAGE
		});
	};
}