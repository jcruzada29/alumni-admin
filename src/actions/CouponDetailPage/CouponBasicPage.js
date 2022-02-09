import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';
import FileHelper from '../../helpers/file';

export function getMerchants() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_MERCHANT_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.merchants.getMerchants();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_MERCHANT_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		let { merchants } = response.data;

		dispatch({
			type: ActionTypes.GET_MERCHANT_SUCCESS,
			payload: {
				merchants,
				loading: false,
				hasLoaded: false
			}
		});
	};
}

export function getCouponById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_COUPON_BASIC_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.coupons.getCouponById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPON_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { coupon } = response.data;
		const newCoupon = { ...coupon };
		newCoupon.is_published = !!coupon.is_published ? 'published' : 'unpublished';
		newCoupon.publish_date_range = `${moment(coupon.publish_start_date).format('YYYY-MM-DD')} - ${moment(coupon.publish_end_date).format('YYYY-MM-DD')}`;

		dispatch({
			type: ActionTypes.GET_COUPON_BASIC_SUCCESS,
			payload: {
				coupon: newCoupon,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function getAssetFileById({ asset_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_COUPON_BASIC_ASSET_FILE_REQUEST,
			payload: {
				loadingAsset: true
			}
		});

		const response = await API.assets.getAssetFileById(asset_id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COUPON_BASIC_ASSET_FILE_ERROR,
				payload: {
					loadingAsset: false,
					meta: response.meta
				}
			});
		}
		const { asset } = response.data;

		dispatch({
			type: ActionTypes.GET_COUPON_BASIC_ASSET_FILE_SUCCESS,
			payload: {
				asset,
				loadingAsset: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { coupon } = getState().couponDetailPage.couponBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_COUPON_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const publishDateArr = _.compact(fields.publish_date_range.split(' - '));
		fields.publish_start_date = moment(publishDateArr[0]).format('YYYY-MM-DD');
		fields.publish_end_date = moment(publishDateArr[1]).format('YYYY-MM-DD');

		// Add asset
		let fileExtension;
		let base64String;
		let newAsset;
		if (fields.file_content) {
			fileExtension = await FileHelper.getExtension(fields.file_content_name);
			base64String = await FileHelper.fileToDataUrl(fields.file_content);
			newAsset = {
				name: fields.file_content_name,
				file_type: fields.file_content.type.split('/')[0] || fileExtension,
				file_name: fields.file_content_name,
				file_extension: fileExtension,
				file_content: base64String
			};
		}

		const body = {
			coupon: {
				...fields,
				is_published: fields.is_published === 'published' ? 1 : 0,
				...(newAsset && { asset: newAsset })
			}
		};

		let response;
		if (coupon) {
			body.coupon.updated_at = coupon.updated_at;
			response = await API.coupons.updateCouponById(coupon.id, body);
		} else {
			response = await API.coupons.createCoupon(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_COUPON_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { coupon: newCoupon } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_COUPON_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				coupon: newCoupon,
				loadingSubmit: false
			}
		});

		// Redirect to details basic page
		dispatch(push(`/coupons/id/basic?id=${newCoupon.id}`));
	};
}

export function navigateToCouponListPage() {
	return async dispatch => {
		dispatch(push(`/coupons`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COUPON_BASIC_PAGE
		});
	};
}