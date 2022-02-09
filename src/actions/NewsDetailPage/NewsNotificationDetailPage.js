import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getNewsNotificationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_NEWS_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.news_notifications.getNewsNotificationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_NEWS_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { news_notification } = response.data;
		const newNewsNotification = { ...news_notification };
		newNewsNotification.delivery_date = moment(news_notification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_NEWS_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				news_notification: newNewsNotification,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { news_notification } = getState().newsDetailPage.newsNotificationDetailPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_NEWS_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			news_notification: {
				...fields
			}
		};

		let response;
		if (news_notification) {
			body.news_notification.updated_at = news_notification.updated_at;
			response = await API.news_notifications.updateNewsNotificationById(news_notification.id, body);
		} else {
			response = await API.news_notifications.createNewsNotification(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_NEWS_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { news_notification: newNewsNotification } = response.data;
		newNewsNotification.delivery_date = moment(newNewsNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SUBMIT_NEWS_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				news_notification: newNewsNotification,
				loadingSubmit: false
			}
		});

		// Redirect to news_notification details
		dispatch(push(`/news/id/notifications/detail?id=${newNewsNotification.news_id}&news_notification_id=${newNewsNotification.id}`));
	};
}

export function onSchedule(newsNotificationId) {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.SCHEDULE_NEWS_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.news_notifications.scheduleNewsNotificationById(newsNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SCHEDULE_NEWS_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newNewsNotification = response.data.news_notification;
		newNewsNotification.delivery_date = moment(newNewsNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SCHEDULE_NEWS_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				news_notification: newNewsNotification
			}
		});
	};
}

export function onSend(newsNotificationId) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SEND_NEWS_NOTIFICATION_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const response = await API.news_notifications.sendNewsNotificationById(newsNotificationId);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SEND_NEWS_NOTIFICATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const newNewsNotification = response.data.news_notification;
		newNewsNotification.delivery_date = moment(newNewsNotification.delivery_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.SEND_NEWS_NOTIFICATION_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				news_notification: newNewsNotification
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_NEWS_NOTIFICATION_DETAIL_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_NEWS_NOTIFICATION_DETAIL_PAGE
		});
	};
}