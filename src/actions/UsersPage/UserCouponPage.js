import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getCouponsByUser({ user_id, page, limit }) {
	return async dispatch => {

		// Update Path
		const optionsQuery = [`id=${user_id}`, `page=${page}`, `limit=${limit}`];
		dispatch(push(`/users/id/coupons?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_USER_COUPON_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.sis.users.getCouponsByUser({ user_id, page, limit });

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.GET_USER_COUPON_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
			return dispatch(push(`/users`));
		}

		const coupons = response.data.coupons;

		dispatch({
			type: ActionTypes.GET_USER_COUPON_SUCCESS,
			payload: {
				coupons: coupons !== null ? coupons : [],
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
			type: ActionTypes.RESET_USER_COUPON
		});
	};
}