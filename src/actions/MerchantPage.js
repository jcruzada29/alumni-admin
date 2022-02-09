import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';
import { push } from 'connected-react-router';
import { reset, initialize } from 'redux-form';

export function getMerchants({ page, limit }) {
	return async (dispatch) => {
		const optionQuery = [`page=${page}`, limit && `limit=${limit}`];
		dispatch(push(`/merchants?${optionQuery.filter(Boolean).join('&')}`));

		dispatch({
			type: ActionTypes.GET_MERCHANT_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.merchants.getMerchants({
			page, limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_MERCHANT_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_MERCHANT_SUCCESS,
			payload: {
				loading: false,
				...response.data
			}
		});
	};
}

export function getMerchantById({ id }) {
	return async (dispatch) => {
		dispatch({
			type: ActionTypes.GET_MERCHANT_REQUEST,
			payload: {
				loadingForm: true
			}
		});

		const response = await API.merchants.getMerchantById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_MERCHANT_ERROR,
				payload: {
					meta: response.meta,
					loadingForm: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_MERCHANT_SUCCESS,
			payload: {
				loadingForm: false,
				form: response.data.merchant
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {

		const { form } = getState().merchantPageReducer;
		dispatch({
			type: ActionTypes.SUBMIT_MERCHANT_FORM_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			merchant: {
				...fields
			}
		};

		let response;
		if (form) {
			body.merchant.updated_at = fields.updated_at;
			response = await API.merchants.updateMerchantById(form.id, body);
		} else {
			response = await API.merchants.createMerchant(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_MERCHANT_FORM_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		} else {
			dispatch(reset('MerchantPage'));
		}

		dispatch({
			type: ActionTypes.SUBMIT_MERCHANT_FORM_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false
			}
		});
	};
}

export function getSearchResult({ page, limit, search }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_MERCHANT_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.merchants.getMerchants({ page, limit, search });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_MERCHANT_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_MERCHANT_SUCCESS,
			payload: {
				loading: false,
				...response.data
			}
		});
	};
}

export function updateForm() {
	return async (dispatch, getState) => {
		const { form } = getState().merchantPageReducer;
		dispatch(initialize('MerchantPage', form ? form : {}));
	};
}

export function emptyForm() {
	return async (dispatch) => {
		dispatch({
			type: ActionTypes.RESET_MERCHANT_PAGE_FORM
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_MERCHANT_PAGE_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_MERCHANT_PAGE
		});
	};
}