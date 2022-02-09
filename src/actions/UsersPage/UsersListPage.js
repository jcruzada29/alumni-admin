import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getUsers({ page, limit, search }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [`page=${page}`, `limit=${limit}`, `search=${search}`];
		dispatch(push(`/users?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_USERS_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.sis.users.getUsers({ page, limit, search });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_USERS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}


		dispatch({
			type: ActionTypes.GET_USERS_SUCCESS,
			payload: {
				loading: false,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				users: response.data.users,
				count: response.data.count
			}
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USERS_LIST_PAGE
		});
	};
}

// export function resetMeta() {
// 	return async dispatch => {
// 		dispatch({
// 			type: ActionTypes.RESET_RESTAURANTS_PAGE_META
// 		});
// 	};
// }

// export function reset() {
// 	return async dispatch => {
// 		dispatch({
// 			type: ActionTypes.RESET_RESTAURANTS_PAGE
// 		});
// 	};
// }