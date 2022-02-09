import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getCoupons({ page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/coupons?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_COUPONS_LIST_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.coupons.getCoupons({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPONS_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		let { coupons } = response.data;

		dispatch({
			type: ActionTypes.GET_COUPONS_LIST_SUCCESS,
			payload: {
				coupons,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function getSearchResult({ page, limit, search }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_COUPONS_LIST_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.coupons.getCoupons({
			page,
			limit,
			search
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPONS_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_COUPONS_LIST_SUCCESS,
			payload: {
				total: response.data.total,
				count: response.data.count,
				loading: false,
				...response.data
			}
		});
	};
}

export function navigateToAddPage() {
	return async dispatch => {
		dispatch(push(`/coupons/create`));
	};
}

export function navigateToDetailPage({ coupon_id }) {
	return async dispatch => {
		dispatch(push(`/coupons/id/basic?id=${coupon_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPONS_LIST_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPONS_LIST_PAGE
		});
	};
}