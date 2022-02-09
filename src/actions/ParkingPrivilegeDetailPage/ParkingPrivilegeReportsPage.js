import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function downloadReports({ parking_id, type }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.DOWNLOAD_PARKING_PRIVILEGE_REPORTS_REQUEST,
			payload: {
				loading: true,
				hasDownloadSuccess: false
			}
		});

		const response = await API.parking_privileges.downloadEventReports({
			parking_id,
			type
		});
        
		console.log('response', response);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DOWNLOAD_PARKING_PRIVILEGE_REPORTS_ERROR,
				payload: {
					meta: response.meta,
					loading: false,
					hasDownloadSuccess: false
				}
			});
		}

		const { csv_string } = response.data;

		dispatch({
			type: ActionTypes.DOWNLOAD_PARKING_PRIVILEGE_REPORTS_SUCCESS,
			payload: {
				csv_string,
				meta: response.meta,
				loadingDownloadSubmit: false,
				hasDownloadSuccess: true
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOWNLOAD_PARKING_PRIVILEGE_REPORTS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOWNLOAD_PARKING_PRIVILEGE_REPORTS_PAGE
		});
	};
}