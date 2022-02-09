import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getParkingUsage({ parking_id, page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`id=${parking_id}`,
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/parking-privileges/id/usage?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_PARKING_USAGE_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.parking_usage.getParkingUsage({
			parking_id,
			page: page,
			limit: limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_USAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { parking_usage } = response.data;

		dispatch({
			type: ActionTypes.GET_PARKING_USAGE_SUCCESS,
			payload: {
				parking_usage,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function getSearchResult({ parking_id, page, limit, search }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_PARKING_USAGE_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.parking_usage.getParkingUsage({ parking_id, page, limit, search });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_USAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { parking_usage } = response.data;

		dispatch({
			type: ActionTypes.GET_PARKING_USAGE_SUCCESS,
			payload: {
				loading: false,
				parking_usage,
				...response.data
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_USAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_USAGE_PAGE
		});
	};
}