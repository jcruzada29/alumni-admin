import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getParkingPriviligesByUser({ user_id, page, limit }) {
	return async dispatch => {

		// Update Path
		const optionsQuery = [`id=${user_id}`, `page=${page}`, `limit=${limit}`];
		dispatch(push(`/users/id/parking-privileges?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_USER_PARKING_PRIVILIGES_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.sis.users.getParkingPriviligesByUser({ user_id, page, limit });

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.GET_USER_PARKING_PRIVILIGES_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
			return dispatch(push(`/users`));
		}

		const parking_priviliges = response.data.parking_priviliges;

		dispatch({
			type: ActionTypes.GET_USER_PARKING_PRIVILIGES_SUCCESS,
			payload: {
				parking_priviliges: parking_priviliges !== null ? parking_priviliges : [],
				loading: false,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count
			}
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_PARKING_PRIVILIGES
		});
	};
}