import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getHighlights({ page, limit, search }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [`page=${page}`, `limit=${limit}`, `search=${search}`];
		dispatch(push(`/highlights?${optionsQuery.join('&')}`));
		dispatch({
			type: ActionTypes.GET_HIGHLIGHTS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.highlights.getHighlights({
			page,
			limit,
			search
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_HIGHLIGHTS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_HIGHLIGHTS_SUCCESS,
			payload: {
				highlights: response.data.highlights,
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
			type: ActionTypes.RESET_HIGHLIGHT_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_HIGHLIGHT_PAGE
		});
	};
}