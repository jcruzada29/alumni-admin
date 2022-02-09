import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';
import { push } from 'connected-react-router';
import { reset, initialize } from 'redux-form';

export function getCheckInAdmins({ page, limit }) {
	return async (dispatch) => {
		const optionsQuery = [`page=${page}`, limit && `limit=${limit}`];
		dispatch(push(`/check-in?${optionsQuery.filter(Boolean).join('&')}`));

		dispatch({
			type: ActionTypes.GET_CHECK_IN_ADMIN_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.check_in_admins.getCheckInAdmins({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_CHECK_IN_ADMIN_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_CHECK_IN_ADMIN_SUCCESS,
			payload: {
				loading: false,
				...response.data
			}
		});
	};
}

export function getCheckInAdminById({ id }) {
	return async (dispatch) => {
		dispatch({
			type: ActionTypes.GET_CHECK_IN_ADMIN_REQUEST,
			payload: {
				loadingForm: true
			}
		});

		const response = await API.check_in_admins.getCheckInAdminById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_CHECK_IN_ADMIN_ERROR,
				payload: {
					meta: response.meta,
					loadingForm: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_CHECK_IN_ADMIN_SUCCESS,
			payload: {
				loadingForm: false,
				form: response.data.check_in_admin
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {

		const { form } = getState().checkInAdminPageReducer;
		dispatch({
			type: ActionTypes.SUBMIT_CHECK_IN_ADMIN_FORM_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			check_in_admin: {
				...fields
			}
		};

		let response;
		if (form) {
			body.check_in_admin.updated_at = fields.updated_at;
			response = await API.check_in_admins.updateCheckInAdminById(form.id, body);
		} else {
			response = await API.check_in_admins.createCheckInAdmin(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_CHECK_IN_ADMIN_FORM_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		} else {
			dispatch(reset('CheckInAdminPage'));
		}

		dispatch({
			type: ActionTypes.SUBMIT_CHECK_IN_ADMIN_FORM_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false
			}
		});
	};
}

export function updateForm() {
	return async (dispatch, getState) => {
		const { form } = getState().checkInAdminPageReducer;
		dispatch(initialize('CheckInAdminPage', form ? form : {}));
	};
}

export function emptyForm() {
	return async (dispatch) => {
		dispatch({
			type: ActionTypes.RESET_CHECK_IN_ADMIN_PAGE_FORM
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CHECK_IN_ADMIN_PAGE_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CHECK_IN_ADMIN_PAGE
		});
	};
}