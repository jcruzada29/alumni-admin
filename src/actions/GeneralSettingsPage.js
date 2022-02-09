import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getSettings() {
	return async dispatch => {
		// Update Path
		dispatch({
			type: ActionTypes.GET_GENERAL_SETTINGS_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.settings.getSettings();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_GENERAL_SETTINGS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_GENERAL_SETTINGS_SUCCESS,
			payload: {
				settings: response.data.settings,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function onSubmit(fields) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.SUBMIT_GENERAL_SETTINGS_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			settings: {
				...fields
			}
		};

		const response = await API.settings.updateSettings(body);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_GENERAL_SETTINGS_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.SUBMIT_GENERAL_SETTINGS_SUCCESS,
			payload: {
				meta: response.meta,
				settings: response.data.settings,
				loadingSubmit: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_GENERAL_SETTINGS_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_GENERAL_SETTINGS_PAGE
		});
	};
}