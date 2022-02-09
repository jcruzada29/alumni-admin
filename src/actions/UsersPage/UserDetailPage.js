import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getUserById(id) {
	return async dispatch => {
		// Update Path
		// const optionsQuery = [`page=${page}`, `limit=${limit}`, `search=${search}`];
		// dispatch(push(`/admin/users?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_USER_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.sis.users.getUserById(id);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.GET_USER_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
			return dispatch(push(`/users`));
		}

		const user = response.data.user;

		dispatch({
			type: ActionTypes.GET_USER_SUCCESS,
			payload: {
				user,
				loading: false
			}
		});
	};
}

export function navigateToUsers(){
	return async dispatch => {
		return dispatch(push(`/users`));
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