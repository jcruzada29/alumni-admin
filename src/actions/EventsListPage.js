import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getEvents({ page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/events?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_EVENTS_LIST_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.events.getEvents({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENTS_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { events } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENTS_LIST_SUCCESS,
			payload: {
				events,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function navigateToAddPage() {
	return async dispatch => {
		dispatch(push(`/events/create`));
	};
}

export function navigateToDetailPage({ event_id }) {
	return async dispatch => {
		dispatch(push(`/events/id/basic?id=${event_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENTS_LIST_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENTS_LIST_PAGE
		});
	};
}