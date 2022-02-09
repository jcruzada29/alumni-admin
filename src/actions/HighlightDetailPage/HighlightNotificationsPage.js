import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getHighlightNotifications({ highlight_id, page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`id=${highlight_id}`,
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/highlights/id/notifications?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_NOTIFICATIONS_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.highlight_notifications.getHighlightNotifications({
			highlight_id,
			page: page,
			limit: limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_HIGHLIGHT_NOTIFICATIONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { highlight_notifications } = response.data;

		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_NOTIFICATIONS_SUCCESS,
			payload: {
				highlight_notifications,
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
			type: ActionTypes.RESET_HIGHLIGHT_NOTIFICATIONS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_HIGHLIGHT_NOTIFICATIONS_PAGE
		});
	};
}