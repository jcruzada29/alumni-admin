import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getParkingPrivileges({ page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/parking-privileges?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_PARKING_PRIVILEGES_LIST_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.parking_privileges.getParkingPrivileges({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_PRIVILEGES_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		let { parkingPrivileges } = response.data;

		dispatch({
			type: ActionTypes.GET_PARKING_PRIVILEGES_LIST_SUCCESS,
			payload: {
				parking_privileges: parkingPrivileges,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function navigateToAddPage() {
	return async dispatch => {
		dispatch(push(`/parking-privileges/create`));
	};
}

export function navigateToDetailPage({ privilege_id }) {
	return async dispatch => {
		dispatch(push(`/parking-privileges/id/basic?id=${privilege_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_PRIVILEGES_LIST_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_PRIVILEGES_LIST_PAGE
		});
	};
}