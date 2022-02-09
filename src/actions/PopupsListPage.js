import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getPopups({ page, limit, search }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [`page=${page}`, `limit=${limit}`, `search=${search}`];
		dispatch(push(`/popups?${optionsQuery.join('&')}`));
		dispatch({
			type: ActionTypes.GET_POPUPS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.popups.getPopups({
			page,
			limit,
			search
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_POPUPS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_POPUPS_SUCCESS,
			payload: {
				popups: response.data.popups,
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
			type: ActionTypes.RESET_POPUP_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_POPUP_PAGE
		});
	};
}