import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getNewsNotifications({ news_id, page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`id=${news_id}`,
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/news/id/notifications?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_NEWS_NOTIFICATIONS_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.news_notifications.getNewsNotifications({
			news_id,
			page: page,
			limit: limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_NEWS_NOTIFICATIONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { news_notifications } = response.data;

		dispatch({
			type: ActionTypes.GET_NEWS_NOTIFICATIONS_SUCCESS,
			payload: {
				news_notifications,
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
			type: ActionTypes.RESET_NEWS_NOTIFICATIONS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_NEWS_NOTIFICATIONS_PAGE
		});
	};
}