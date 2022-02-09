import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAdmins({ page, limit, search }) {
	return async dispatch => {

		// Update Path
		const optionsQuery = [`page=${page}`, `limit=${limit}`, `search=${search}`];
		dispatch(push(`/admins?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_ADMINS_LIST_PAGE_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admins.getAdmins({
			page,
			limit,
			search
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ADMINS_LIST_PAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_ADMINS_LIST_PAGE_SUCCESS,
			payload: {
				admins: response.data.admins,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function navigateToDetailPage({ admin_id }) {
	return async dispatch => {
		dispatch(push(`/admins/id?id=${admin_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMINS_LIST_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMINS_LIST_PAGE
		});
	};
}