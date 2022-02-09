import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';
import { push } from 'connected-react-router';
import { reset, initialize } from 'redux-form';

export function getParkingAdmins({ page, limit }) {
	return async (dispatch) => {
		const optionQuery = [`page=${page}`, limit && `limit=${limit}`];
		dispatch(push(`/parking-admins?${optionQuery.filter(Boolean).join('&')}`));

		dispatch({
			type: ActionTypes.GET_PARKING_ADMIN_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.parking_admins.getParkingAdmins({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_ADMIN_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_PARKING_ADMIN_SUCCESS,
			payload: {
				loading: false,
				...response.data
			}
		});
	};
}

export function getParkingAdminById({ id }) {
	return async (dispatch) => {
		dispatch({
			type: ActionTypes.GET_PARKING_ADMIN_REQUEST,
			payload: {
				loadingForm: true
			}
		});

		const response = await API.parking_admins.getParkingAdminById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_ADMIN_ERROR,
				payload: {
					meta: response.meta,
					loadingForm: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_PARKING_ADMIN_SUCCESS,
			payload: {
				loadingForm: false,
				form: response.data.parking_admin
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {

		const { form } = getState().parkingAdminPageReducer;
		dispatch({
			type: ActionTypes.SUBMIT_PARKING_ADMIN_FORM_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			parking_admin: {
				...fields
			}
		};

		let response;
		if (form) {
			body.parking_admin.updated_at = fields.updated_at;
			response = await API.parking_admins.updateParkingAdminById(form.id, body);
		} else {
			response = await API.parking_admins.createParkingAdmin(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_PARKING_ADMIN_FORM_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		} else {
			dispatch(reset('ParkingAdminPage'));
		}

		dispatch({
			type: ActionTypes.SUBMIT_PARKING_ADMIN_FORM_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false
			}
		});
	};
}

export function updateForm() {
	return async (dispatch, getState) => {
		const { form } = getState().parkingAdminPageReducer;
		if (form) {
			const { password, ...noPass } = form;
			const newForm = {
				password: "",
				...noPass
			};
			dispatch(initialize('ParkingAdminPage', newForm ? newForm : {}));
		} else {
			dispatch(initialize('ParkingAdminPage', form ? form : {}));
		}
	};
}

export function emptyForm() {
	return async (dispatch) => {
		dispatch({
			type: ActionTypes.RESET_PARKING_ADMIN_PAGE_FORM
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_ADMIN_PAGE_META
		});
	};
}