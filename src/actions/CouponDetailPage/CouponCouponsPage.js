import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getCouponCoupons({ coupon_id, page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [
			`id=${coupon_id}`,
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/coupons/id/coupons?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_COUPON_COUPONS_REQUEST,
			payload: {
				page: +page,
				limit: +limit,
				loading: true
			}
		});

		const response = await API.coupon_coupons.getCouponCoupons({
			coupon_id,
			page: page,
			limit: limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPON_COUPONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { coupon_subscriptions } = response.data;

		dispatch({
			type: ActionTypes.GET_COUPON_COUPONS_SUCCESS,
			payload: {
				coupon_coupons: coupon_subscriptions,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function getSearchResult({ coupon_id, page, limit, search }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_COUPON_COUPONS_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.coupon_coupons.getCouponCoupons({ coupon_id, page, limit, search });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPON_COUPONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { coupon_subscriptions } = response.data;

		dispatch({
			type: ActionTypes.GET_COUPON_COUPONS_SUCCESS,
			payload: {
				loading: false,
				coupon_coupons: coupon_subscriptions,
				...response.data
			}
		});
	};
}

export function onDeleteCouponSubscriptionById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_COUPON_COUPONS_REQUEST,
			payload: {
				loadingDelete: true,
				hasDeleted: false
			}
		});

		const response = await API.coupon_coupons.deleteCouponSubscriptionById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_COUPON_COUPONS_ERROR,
				payload: {
					meta: response.meta,
					loadingDelete: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_COUPON_COUPONS_SUCCESS,
			payload: {
				meta: response.meta,
				loadingDelete: false,
				hasDeleted: true
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_COUPONS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_COUPONS_PAGE
		});
	};
}