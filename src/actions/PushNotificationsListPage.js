import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getPushNotifications({ page, limit, search }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [`page=${page}`, `limit=${limit}`, `search=${search}`];
		dispatch(push(`/push-notifications?${optionsQuery.join('&')}`));
		dispatch({
			type: ActionTypes.GET_PUSH_NOTIFICATIONS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.push_notifications.getPushNotifications({
			page,
			limit,
			search
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PUSH_NOTIFICATIONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_PUSH_NOTIFICATIONS_SUCCESS,
			payload: {
				push_notifications: response.data.push_notifications,
				page: response.data.page,
				limit: response.data.limit,
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
			type: ActionTypes.RESET_PUSH_NOTIFICATIONS_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PUSH_NOTIFICATIONS_PAGE
		});
	};
}