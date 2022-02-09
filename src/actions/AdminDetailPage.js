import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';
import GeneralHelper from '../helpers/general';

export function getAdminById(id) {
	return async dispatch => {
		// Update Path
		dispatch({
			type: ActionTypes.GET_ADMIN_DETAIL_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.admins.getAdminById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ADMIN_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_ADMIN_DETAIL_SUCCESS,
			payload: {
				admin: response.data.admin,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { admin } = getState().adminDetailPageReducer;

		// check if valid ust email address.
		if (fields && fields.email && !GeneralHelper.isUstEmail(fields.email)){
			return dispatch({
				type: ActionTypes.SUBMIT_ADMIN_DETAIL_ERROR,
				payload: {
					meta: {
						code: 4011,
						message: 'Invalid email address.'
					}
				}
			});
		}

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true,
				hasLoaded: false
			}
		});

		const body = {
			admin: {
				admin_id: fields.id,
				email: fields.email
			}
		};

		let response;
		if (admin) {
			body.admin.updated_at = fields.updated_at;
			response = await API.admins.updateAdminById(admin.id, body);
		} else {
			response = await API.admins.createAdmin(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_ADMIN_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false,
					hasLoaded: false
				}
			});
			return;
		}

		const { admin: newAdmin } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				admin: newAdmin,
				loadingSubmit: false,
				hasLoaded: true
			}
		});

		// Redirect to details basic page
		if (!admin) {
			dispatch(push(`/admins/id?id=${newAdmin.id}`));
		}
	};
}

export function deleteAdminById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.admins.deleteAdminById(id);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_ADMIN_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_DETAIL_SUCCESS,
			payload: {
				loadingSubmit: false,
				meta: response.meta
			}
		});

		dispatch(push(`/admins`));
	};
}

export function navigateToAdminListPage() {
	return async dispatch => {
		dispatch(push(`/admins`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMIN_DETAIL_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMIN_DETAIL_PAGE
		});
	};
}